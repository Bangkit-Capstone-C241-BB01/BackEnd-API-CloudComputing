const jwt = require('jsonwebtoken');
const { generateToken } = require('../middleware')

const userSignUp = async (req, res) => {
    const {
        user_name, 
        user_email, 
        user_password, 
        role, 
        store_name
    } = req.body;
    res.status(201).json({ message: 'User registered successfully!' });
};

const userLogin = async (req, res) => {
    res.status(200).json({
       message: 'this is login',
    })
};

module.exports = {
    userSignUp,
    userLogin
};