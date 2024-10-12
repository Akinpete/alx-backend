import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

// Start with the test mode to prevent actual job processing
const queue = kue.createQueue();

describe('createPushNotificationsJobs', () => {
  before(() => {
    // Enable test mode
    kue.Job.testMode.enter();
  });

  afterEach(() => {
    // Clear the queue after each test
    kue.Job.testMode.clear();
  });

  after(() => {
    // Exit test mode after all tests
    kue.Job.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not an array', queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      }
    ];

    createPushNotificationsJobs(jobs, queue);

    // Check that the jobs were created in the queue
    expect(kue.Job.testMode.jobs.length).to.equal(2);

    // Check the content of each job
    expect(kue.Job.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(kue.Job.testMode.jobs[0].data).to.deep.equal(jobs[0]);

    expect(kue.Job.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(kue.Job.testMode.jobs[1].data).to.deep.equal(jobs[1]);
  });
});
