#!/usr/bin/env node

import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

/**
 * Sets a new school in the Redis database.
 *
 * @param {string} schoolName - The name of the school.
 * @param {string} value - The value to set for the school.
 * @return {void}
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

/**
 * Retrieves the value associated with the given school name from
 * the Redis client and logs it to the console.
 *
 * @param {string} schoolName - The name of the school whose value is to be retrieved.
 * @return {Promise<void>} A promise that resolves when the value is successfully
 * retrieved and logged, or rejects with an error if there was an issue retrieving the
 * value.
 */
async function displaySchoolValue(schoolName) {
  const asyncOp = promisify(client.get).bind(client);
  try {
    const val = await asyncOp(schoolName);
    console.log(val);
  } catch (err) {
    console.log(`Error retrieveing value: ${err}`);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
