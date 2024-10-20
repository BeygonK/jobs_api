const redis = require('redis');

const redisClient = redis.createClient({
    url:`redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDISHOST}:${process.env.REDISPORT}`
    ,
    password: process.env.REDIS_PASSWORD
  });

class RedisClient {
    constructor() {
        this.client = redisClient;

        // Handle Redis errors
        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });

        // Connect to Redis
        this.client.connect().then(() => {
            console.log('Connected to Redis');
        });
    }

    /**
     * Store token in Redis with an expiration time.
     * @param {string} sessionId - The key to identify the session (e.g., userId or generated session ID).
     * @param {string} token - The JWT token to store.
     * @param {number} expirationTime - The time in seconds before the token expires.
     */
    async setToken(sessionId, token, expirationTime) {
        try {
            await this.client.set(sessionId, token, { EX: expirationTime });
        } catch (error) {
            console.error('Error setting token in Redis:', error);
        }
    }

    /**
     * Retrieve token from Redis.
     * @param {string} sessionId - The key to identify the session.
     * @returns {Promise<string|null>} - The JWT token or null if not found.
     */
    async getToken(sessionId) {
        try {
            const token = await this.client.get(sessionId);
            return token;
        } catch (error) {
            console.error('Error retrieving token from Redis:', error);
            return null;
        }
    }

    /**
     * Delete token from Redis.
     * @param {string} sessionId - The key to identify the session.
     */
    async deleteToken(sessionId) {
        try {
            await this.client.del(sessionId);
        } catch (error) {
            console.error('Error deleting token from Redis:', error);
        }
    }
}

// Export an instance of RedisClient
const redisclient = new RedisClient()
module.exports = redisclient;
