const express = require('express');
const asyncHandler = require('express-async-handler');
const UsersController = require('../controllers/userController');


const router = express.Router();
// Register endpoint
router.post('/register', asyncHandler(UsersController.register));
router.post('/login', asyncHandler(UsersController.login));
router.post('/logout', asyncHandler(UsersController.logout));
router.get('/profile', asyncHandler(UsersController.profile));
router.put('/profile', asyncHandler(UsersController.updateProfile));

module.exports = router;