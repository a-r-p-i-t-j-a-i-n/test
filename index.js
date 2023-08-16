require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 3000;

try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('database connected successfully');
    })

    connection.on('error', (error) => {
        console.log('please make sure your database is running fine!' + error);
        process.exit();
    })
} catch (error) {
    console.log(error.message);
}

app.use(express.json())

app.get("/", (req, res) => {

    res.send("hello world!")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})