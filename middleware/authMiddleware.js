const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redis');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Code to verify token
const verifyToken = asyncHandler(async (req, res, next) => {
    const sessionId = req.headers['session'];
    
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

    // Verify token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Invalid token!')
    }
    
});

module.exports = verifyToken;