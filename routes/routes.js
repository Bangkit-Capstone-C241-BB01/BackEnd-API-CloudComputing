const express = require('express');
const { authenticateToken } = require('../middleware/middleware');

const { userSignUp, userLogin } = require('../controllers/authentication');
const { getProfile, updateProfile } = require('../controllers/profile');
const { getSellerStore, updateSellerStore, getAllStore, getStoreById } = require('../controllers/store-handler');
const { getProductStore, postNewProduct, getAllProduct, searchProductName, getSellerProductById, getProductById } = require('../controllers/product-handler');
const { sortProductByRate, sortStoreByRate, sortProductByNewest, sortProductByLocation } = require('../controllers/sort');
const { dashboard, totals, approveImgQuality, rejectImgQuality } = require('../controllers/admin-handler');
const { getAppeal, postAppeal, getAppealBySellerId } = require('../controllers/appeal-handler');

const multer = require ('multer');
const upload = multer();

const router = express.Router();

//Authentication
router.post('/register', userSignUp);
router.post('/login', userLogin);

//profile
router.get('/profiles', authenticateToken, getProfile);
router.put('/profiles', authenticateToken, upload.single('img_user'), updateProfile);

//store
router.get('/sellers/store', authenticateToken, getSellerStore);
router.put('/sellers/store', authenticateToken, upload.single('img_store'), updateSellerStore);
router.get('/stores', authenticateToken, getAllStore);
router.get('/stores/:storeId', authenticateToken, getStoreById);

//product
router.post('/sellers/products', authenticateToken, upload.single('img_product'), postNewProduct);
router.get('/sellers/products', authenticateToken, getProductStore);
router.get('/products', authenticateToken, getAllProduct);
router.get('/sellers/products/:productId', authenticateToken, getSellerProductById);
router.get('/products/:productId', authenticateToken, getProductById);
router.post('/customers/products', authenticateToken, searchProductName);

//sort
router.get('/customers/products/news', authenticateToken, sortProductByNewest);
router.get('/customers/products/rates', authenticateToken, sortProductByRate);
router.get('/customers/products/locations', authenticateToken, sortProductByLocation);
router.get('/customers/stores/rates', authenticateToken, sortStoreByRate);

//admin dashboard
router.get('/admins/dashboards', authenticateToken, dashboard);
router.get('/admins/totals', authenticateToken, totals);

//appeal
router.get('/admins/appeals', authenticateToken, getAppeal);
router.post('/sellers/appeals', authenticateToken, postAppeal);
router.get('/sellers/appeals', authenticateToken, getAppealBySellerId);

//admin approval
router.put('/admins/appeals/approves/', authenticateToken, approveImgQuality);
router.delete('/admins/appeals/rejects/', authenticateToken, rejectImgQuality);

module.exports = { router };