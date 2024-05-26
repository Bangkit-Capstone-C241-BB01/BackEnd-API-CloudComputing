const express = require('express');
const { userSignUp, userLogin } = require('../controllers/authentication');
const { authenticateToken } = require('../middleware/middleware');

const router = express.Router();

//Authentication
router.post('/register', userSignUp);
router.post('/login', userLogin);

router.get('/profile', ); //get detail profile
router.put('/profile', ); //update profile

router.get('/stores', ); // get all stores (optional)
router.get('/stores/:store_id', ); //detail store
router.put('/stores/:store_id', ); //update store

router.get('/products', ); //get all products
router.get('/products/:product_id', ); //detail product

module.exports = { router };