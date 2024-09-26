#!/usr/bin/env node

import redis from 'redis';

const publisher = redis.createClient();

publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

publisher.on('error', (err) =>
  console.log(`Redis client not connected to the server: ${err}`)
);

/**
 * Publishes a message to the 'holberton school channel' after a specified delay.
 *
 * @param {string} message - The message to be published.
 * @param {number} time - The delay in milliseconds before publishing the message.
 * @return {void} This function does not return anything.
 */
const publishMessage = (message, time) => {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    publisher.publish('holberton school channel', message);
  }, time);
};

publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
