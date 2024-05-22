const express = require('express');
const { userSignUp, userLogin } = require('../controllers/authentication');

const router = express.Router();

//TODO: Authentication (POST register & login for 3 roles admin, seller, & user)
router.post('/register', userSignUp);
router.post('/login', userLogin);


module.exports = { router };