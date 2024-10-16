const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redis');

// Code to verify token
const verifyToken = asyncHandler(async (req, res, next) => {
    const sessionId = req.headers['x-session-id'];
    if (!sessionId) {
        res.status(401);
        throw new Error('No session found!')
    }

    // Get token from redis
    const token = await redisClient.getToken(sessionId);

    if (!token) {
        res.status(401);
        throw new Error('Invalid session!')
    }

    // verify token using jwt
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded; // attach user data to request
    next();
});

module.exports = verifyToken;