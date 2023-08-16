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

app.post("/api", (req, res) => {
    const { name, email } = req.body;
    if (!email || !name) {
        return res.json({
            success: false,
            message: 'all field require'
        })
    }

    console.log(req.body);
    return res.json({
        sucess: true,
        message: "user successfully loged in"

    })
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})