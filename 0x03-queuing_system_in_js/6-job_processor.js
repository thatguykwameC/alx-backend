#!/usr/bin/env node

import kue from 'kue';

const queue = kue.createQueue();

/**
 * Logs a notification message to the console.
 *
 * @param {string} phoneNumber - The phone number to send the notification to.
 * @param {string} message - The message to send in the notification.
 * @return {undefined} This function does not return a value.
 */
function sendNotification(phoneNumber, message) {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
}

queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
