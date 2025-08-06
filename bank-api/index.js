const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// 1. Check Account Balance
app.get('/accountBalance/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, name, balance FROM customers WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add Money
app.post('/addMoney', async (req, res) => {
  const { id, amount } = req.body;
  try {
    const result = await pool.query(
      'UPDATE customers SET balance = balance + $1 WHERE id = $2 RETURNING id, name, balance',
      [amount, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Transfer Money
app.post('/transferMoney', async (req, res) => {
  const { fromId, toId, amount } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const fromUser = await client.query('SELECT * FROM customers WHERE id = $1', [fromId]);
    const toUser = await client.query('SELECT * FROM customers WHERE id = $1', [toId]);

    if (fromUser.rows.length === 0 || toUser.rows.length === 0) {
      throw new Error('Invalid sender or receiver ID');
    }

    if (fromUser.rows[0].balance < amount) {
      throw new Error('Insufficient balance');
    }

    await client.query('UPDATE customers SET balance = balance - $1 WHERE id = $2', [amount, fromId]);
    await client.query('UPDATE customers SET balance = balance + $1 WHERE id = $2', [amount, toId]);

    await client.query('COMMIT');

    res.json({
      message: 'Transfer successful',
      from: fromUser.rows[0].name,
      to: toUser.rows[0].name,
      amount
    });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});


// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('Bank Services are up and running.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`bank-api running on port ${PORT}`);
});
