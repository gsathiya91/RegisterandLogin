const router = require('express').Router();
const User = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    try {
        const existUserName = await User.findOne({ userName: req.body.userName });
        if (existUserName) {
            return res.status(400).json("Username already exists!");
        }
        const existEmail = await User.findOne({ email: req.body.email });
        if (existEmail) {
            return res.status(400).json("Email already exists!");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        });

        const data = await user.save();
        res.json(data);

    } catch (err) {
        res.status(400).json(err)
    }

});


router.post('/login', async (req, res) => {
    try {
        const existedUsername = await User.findOne({ userName: req.body.userName });
        if (!existedUsername) {
            return res.status(400).json("User not registered!");
        }

        const validatePassword = await bcrypt.compare(req.body.password, existedUsername.password);
        if (!validatePassword) {
            return res.status(400).json("Password did not match!");
        }

        const token = await jwt.sign({ userName: existedUsername.userName }, 'SECRET_KEY');
        res.header('accessToken', token).json(token);

    } catch (err) {
        console.log(err);
    }
})

module.exports = router;