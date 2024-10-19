const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');


// Route to verify token validity
router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});

module.exports = router;
