const mongoose = require('mongoose');

module.exports = () => {
   
    try {
        mongoose.connect("mongodb+srv://Gsathiya:capstoneproject@cluster0.ktemn.mongodb.net/SigninSignup?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
         console.log("Could not connect with the database");
    }
};
