const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

const registerRoute = require('./routes');
const mongoose = require('mongoose');

app.use(express.json());

app.use(cors());
dotenv.config();

app.use('/', registerRoute);

const PORT = process.env.PORT || 5000

mongoose.connect("mongodb+srv://Gsathiya:capstoneproject@cluster0.ktemn.mongodb.net/SigninSignup?retryWrites=true&w=majority").then(() => {
    console.log("DB connected successfully")
}).catch((err) => {
    console.log(err)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })