#!/usr/bin/env node

/**
 * Creates push notification jobs and saves them to the queue.
 *
 * @param {Array} jobs - An array of job data objects.
 * @param {Object} queue - The queue object to create the jobs on.
 * @throws {Error} If the jobs parameter is not an array.
 * @return {void}
 */
export default function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');

  jobs.forEach((jobDt) => {
    const job = queue.create('push_notification_code_3', jobDt);
    job.save((err) => {
      if (!err) console.log(`Notification job created: ${job.id}`);
    });

    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    job.on('failed', (errMsg) => {
      console.log(`Notification job ${job.id} failed: ${errMsg}`);
    });

    job.on('progress', (prog) => {
      console.log(`Notification job ${job.id} ${prog}% complete`);
    });
  });
}
