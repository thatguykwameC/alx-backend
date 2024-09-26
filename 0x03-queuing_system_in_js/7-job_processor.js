#!/usr/bin/env node

import kue from 'kue';

const queue = kue.createQueue();
const blacklistedNums = ['4153518780', '4153518781'];

/**
 * Sends a notification to a phone number.
 *
 * @param {string} phoneNumber - The phone number to send the notification to.
 * @param {string} message - The message to send in the notification.
 * @param {Object} job - The job object.
 * @param {Function} done - The callback function to be called when the notification is sent.
 * @return {void}
 */
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);

  if (blacklistedNums.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  job.progress(50, 100);

  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
  done();
}

queue.process('push_notification_code_2', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
