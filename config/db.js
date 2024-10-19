const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo connected...')
    } catch(err) {
        console.log(err);
    }
}

module.exports = dbConnection;