FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Do NOT copy .env in Docker build
COPY . . 
RUN rm -f .env  # just in case

EXPOSE 3000

CMD ["node", "index.js"]