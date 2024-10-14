const express = require('express');
const dotenv = require('dotenv');
const user = require('./routes/user');
const CustomErrorHandler = require('./middleware/errorHandler')
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000

app.use('/api/v1/user', user);

// Error Handler middleware
app.use(CustomErrorHandler.notFound);
app.use(CustomErrorHandler.errorHandler);

app.get('/api/v1', (req, res) => {
    res.status(200).json({"message": "Home end point"});
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));