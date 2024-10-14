const bcrypt = require('bcrypt');
const User = require('../models/User');

// User class implementation
class UsersController {
    // @desc    Auth/user 
    // route    POST api/v1/user/register
    // @access  Public  
    static async register(req, res) {
        
        res.status(200).json({"message": "user registered"})
    }

     // @desc    Auth login
    // route    POST api/v1/user/login
    // @access  Public  
    static async login(req, res) {
        res.status(200).json({"message": "Login success"})
    }

     // @desc    Auth logout
    // route    POST api/v1/user/logout
    // @access  private 
    static async logout(req, res) {
        res.status(200).json({"message": "user created"})
    }

     // @desc    User Profile
    // route    GET api/user/profile
    // @access  Private
    static async profile(req, res) {
        res.status(200).json({"message": "user created"})
    }

     // @desc    Update User profile
    // route    PUT api/user/profile
    // @access  Public  
    static async updateProfile(req, res) {
        res.status(200).json({"message": "user created"})
    }
}

module.exports = UsersController;