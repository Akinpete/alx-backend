import redis from 'redis';

// Create Redis client
const client = redis.createClient();

// Handle connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});

// Subscribe to the "holberton school channel"
client.subscribe('holberton school channel');

// Listen for messages
client.on('message', (channel, message) => {
  console.log(`Received message: ${message}`);

  // Unsubscribe and quit if the message is "KILL_SERVER"
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});
