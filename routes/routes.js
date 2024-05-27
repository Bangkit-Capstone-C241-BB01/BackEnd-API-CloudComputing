const express = require('express');
const { authenticateToken } = require('../middleware/middleware');

const { userSignUp, userLogin } = require('../controllers/authentication');
const { getProfile, updateProfile } = require('../controllers/profile');

const router = express.Router();

//Authentication
router.post('/register', userSignUp);
router.post('/login', userLogin);

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

module.exports = { router };