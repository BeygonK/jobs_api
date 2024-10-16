const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const redisClient = require('../utils/redis');

// User class implementation
class UsersController {
    // @desc    Auth/user 
    // route    POST api/v1/user/register
    // @access  Public  
    static async register(req, res) {
        const { email, username, password } = req.body;

        // check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('Email already exist!')
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = await User.create({ email, username, password: hashedPassword });
        if (newUser){
            res.status(201).json({ 
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
             });
        } else {
            res.status(400);
            throw new Error('Failed to create user!')
        }
    }

     // @desc    Auth login
    // route    POST api/v1/user/login
    // @access  Public  
    static async login(req, res) {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401);
            throw new Error('Invalid credentials!')
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid credentials!')
        }

        // create and send JWT token
        const sessionId = `session:${user._id}`;
        const token = generateToken(user._id);

        // store token in Redis with an expiration time
        await redisClient.setToken(sessionId, token, 3600); // 1 hour

        res.json({
            _id: user._id,
            email: user.email,
            username: user.username,
            // send sessionId to frontend
            sessionId,
        });
    }

     // @desc    Auth logout
    // route    POST api/v1/user/logout
    // @access  private 
    static async logout(req, res) {
        const sessionId = req.headers['x-session-id'];
        if (!sessionId) {
            res.status(401);
            throw new Error('No session found!')
        }

        // delete token from Redis
        await redisClient.deleteToken(sessionId);

        res.json({"message": "Logged out"})
    }

     // @desc    User Profile
    // route    GET api/user/profile
    // @access  Private
    static async profile(req, res) {
            // Fetch the user from the database using the ID from the token
            const user = await User.findById(req.user.userId).select('-password');  // Exclude password

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404);
                throw new Error('User not found');
            }

        
    }
}

module.exports = UsersController;