const Redis = require("ioredis");
const redis = new Redis({
  host: "127.0.0.1", // or your Redis host
  port: 6379,
  maxRetriesPerRequest: null, // Disables retry limit
});
module.exports = redis;
