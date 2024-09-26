#!/usr/bin/env node

import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) =>
  console.log(`Redis client not connected to the server: ${err.message}`)
);

client.on('connect', () => console.log('Redis client connected to the server'));

/**
 * Inserts key-value pairs into a Redis hash.
 *
 * @return {void} This function does not return anything.
 */
const insertHash = () => {
  client.hset('HolbertonSchools', 'Portland', 50, redis.print);
  client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  client.hset('HolbertonSchools', 'New York', 20, redis.print);
  client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  client.hset('HolbertonSchools', 'Cali', 40, redis.print);
  client.hset('HolbertonSchools', 'Paris', 2, redis.print);
};

/**
 * Prints the entire hash stored under the key 'HolbertonSchools'
 * in the Redis client.
 *
 * @return {void} This function does not return anything.
 */
const printHash = () => {
  client.hgetall('HolbertonSchools', (err, obj) => {
    console.log(obj);
  });
};

insertHash();
printHash();
