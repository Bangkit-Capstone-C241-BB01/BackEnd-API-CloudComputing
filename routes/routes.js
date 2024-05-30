const express = require('express');
const { authenticateToken } = require('../middleware/middleware');

const { userSignUp, userLogin } = require('../controllers/authentication');
const { getProfile, updateProfile } = require('../controllers/profile');
const { getSellerStore, updateSellerStore, getAllStore } = require('../controllers/store-handler');
const { getProductStore, postNewProduct, getAllProduct, searchProductName } = require('../controllers/product-handler');
const { sortProductByRate, sortStoreByRate, sortProductByNewest, sortProductByLocation } = require('../controllers/sort');
const { dashboard, totals } = require('../controllers/admin-handler');
const { getAppeal, postAppeal } = require('../controllers/appeal-handler');

const multer = require ('multer');
const upload = multer();

const router = express.Router();

//Authentication
router.post('/register', userSignUp);
router.post('/login', userLogin);

//profile
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, upload.single('img_user'), updateProfile);

//store
router.get('/sellers/store', authenticateToken, getSellerStore);
router.put('/sellers/store', authenticateToken, upload.single('img_store'), updateSellerStore);
router.get('/stores', authenticateToken, getAllStore);

//product
router.post('/sellers/product', authenticateToken, upload.single('img_product'), postNewProduct);
router.get('/sellers/product', authenticateToken, getProductStore);
router.get('/products', authenticateToken, getAllProduct);
router.post('/products', authenticateToken, searchProductName);

//sort
router.get('/products/new', authenticateToken, sortProductByNewest);
router.get('/products/rate', authenticateToken, sortProductByRate);
router.get('/products/location', authenticateToken, sortProductByLocation);
router.get('/stores/rate', authenticateToken, sortStoreByRate);

//admin dashboard
router.get('/admin/dashboard', authenticateToken, dashboard);
router.get('/admin/totals', authenticateToken, totals);

//appeal
router.get('/admin/appeal', authenticateToken, getAppeal);
router.post('/sellers/appeal', authenticateToken, postAppeal);

module.exports = { router };