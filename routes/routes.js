const express = require('express');
const { multer } = require ('multer');
const { authenticateToken } = require('../middleware/middleware');

const { userSignUp, userLogin } = require('../controllers/authentication');
const { getProfile, updateProfile } = require('../controllers/profile');
const { getSellerStore, updateSellerStore, getAllStore } = require('../controllers/storeHandler');

const router = express.Router();

//Authentication
router.post('/register', userSignUp);
router.post('/login', userLogin);

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

router.get('/sellers/store', authenticateToken, getSellerStore);
router.put('/sellers/store', authenticateToken, updateSellerStore);

router.get('/stores', authenticateToken, getAllStore);

router.post('/sellers/product', authenticateToken, );
router.get('/products', authenticateToken, );


module.exports = { router };