import express from 'express';

const app = express();

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.status(200).json({"message": "Home end point"});
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));