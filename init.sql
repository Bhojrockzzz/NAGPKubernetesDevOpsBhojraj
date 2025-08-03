CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00
);

INSERT INTO customers (name, balance) VALUES
('Alice', 5000.00),
('Bob', 3200.00),
('Charlie', 2750.50),
('Diana', 10000.00),
('Ethan', 150.00);
