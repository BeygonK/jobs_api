const express = require('express');
const dotenv = require('dotenv').config();
const dbConnection = require('./config/db');
const user = require('./routes/user');
const jobs = require('./routes/jobs');
const CustomErrorHandler = require('./middleware/errorHandler')

dbConnection();

const app = express();

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api/v1/user', user);
app.use('/api/v1/jobs', jobs);

// Error Handler middleware
app.use(CustomErrorHandler.notFound);
app.use(CustomErrorHandler.errorHandler);

app.get('/api/v1', (req, res) => {
    res.status(200).json({"message": "Home end point"});
});

app.listen(PORT, () => console.log(`Server connected...`));