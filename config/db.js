const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('Mongo connected...')
    } catch(err) {
        console.log(err);
    }
}

module.exports = dbConnection;