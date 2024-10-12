import kue from 'kue';

// Blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notification
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100); // Start job progress at 0%

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Simulate some delay and update job progress
  job.progress(50, 100); // Update job progress to 50%
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Finish job successfully
  done();
}

// Create a Kue queue
const queue = kue.createQueue();

// Process jobs from 'push_notification_code_2' queue, 2 jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
