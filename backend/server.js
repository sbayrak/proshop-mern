import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';

const app = express();

connectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/api/product/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
