const jwt = require('jsonwebtoken');

// function to generate Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = generateToken;