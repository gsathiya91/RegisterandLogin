const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connection = require('./db');
const registerRoute = require('./routes');

app.use(express.json());
connection();
app.use(cors());
dotenv.config();

app.use('/api', registerRoute);

app.listen(5000, () => {
    console.log('Server is running at port 5000');
})

