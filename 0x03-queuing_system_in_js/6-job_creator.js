import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Create a job object
const jobData = {
  phoneNumber: '1234567890',
  message: 'This is a test notification',
};

// Create a job in the "push_notification_code" queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.error('Notification job failed to create:', err);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

// Handle job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Handle job failure
job.on('failed', () => {
  console.log('Notification job failed');
});
