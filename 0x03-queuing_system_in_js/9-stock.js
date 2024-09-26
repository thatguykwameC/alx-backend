#!/usr/bin/env node

import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const host = 'localhost';
const port = 1245;

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

const client = redis.createClient();
const getCl = promisify(client.get).bind(client);
const setCl = promisify(client.set).bind(client);

/**
 * Retrieves an item from the list of products based on its ID.
 *
 * @param {number} id - The ID of the product to retrieve.
 * @return {Object|undefined} The product object with the given ID,
 * or undefined if not found.
 */
const getItemById = (id) => {
  return listProducts.find((prd) => prd.id === id);
};

app.get('/', (req, res) => res.send('Homepage\n'));
app.get('/list_products', (req, res) => {
  const prods = listProducts.map((prd) => ({
    itemId: prd.id,
    itemName: prd.name,
    price: prd.price,
    initialAvailableQuantity: prd.stock,
  }));
  res.json(prods);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const prd = getItemById(itemId);

  if (!prd) return res.json({ status: 'Product not found' });

  const rsvStock = await getCurrentReservedStockById(itemId);
  const currentQty = prd.stock - rsvStock;

  res.json({
    itemId: prd.id,
    itemName: prd.name,
    price: prd.price,
    initialAvailableQuantity: prd.stock,
    currentQuantity: currentQty,
  });
});

/**
 * Reserves a specific amount of stock for a given item in the Redis database.
 *
 * @param {number} itemId - The ID of the item.
 * @param {number} stock - The amount of stock to reserve.
 * @return {Promise<void>} - A promise that resolves when the stock is
 * reserved successfully.
 */
async function reserveStockById(itemId, stock) {
  await setCl(`item.${itemId}`, stock);
}

/**
 * Retrieves the current reserved stock for a given item ID from the Redis database.
 *
 * @param {number} itemId - The ID of the item.
 * @return {Promise<number>} The current reserved stock for the item, or 0 if not found.
 */
async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getCl(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock, 10) : 0;
}

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const prd = getItemById(itemId);

  if (!prd) return res.json({ status: 'Product not found' });

  if (prd.stock <= 0)
    return res.json({ status: 'Not enough stock available', itemId });

  await reserveStockById(itemId, prd.stock - 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(port, host, () => {
  console.log(`Server listening to ${host}/${port}`);
});
