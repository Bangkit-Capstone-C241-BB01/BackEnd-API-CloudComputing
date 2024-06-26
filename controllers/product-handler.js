const axios = require("axios");
const {
    user,
    store,
    product
} = require('../config/database').models;
const { Op } = require('sequelize');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    // keyFilename: process.env.SERVICE_ACCOUNT_KEY
});

const bucket = storage.bucket(process.env.BUCKET_PRODUCT_NAME);

const getProductStore = async (req, res) => {
    try {
        const sellerUserId = req.user.user_id;

        const sellerStore = await store.findOne({
            where: { user_id: sellerUserId },
            include: [{
                model: user,
                attributes: ['user_id', 'user_name']
            }]
        });

        if (!sellerStore) {
            return res.status(403).json({ msg: 'User does not have a store.' });
        }

        const products = await product.findAll({
            where: { store_id: sellerStore.store_id }
        });

        const { user_id, user_name, store_id, store_name } = sellerStore;

        res.status(200).json({ user_id, user_name, store_id, store_name, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const postNewProduct = async (req, res) => {
    try {
        const sellerUserId = req.user.user_id;

        const sellerStore = await store.findOne({
            where: { user_id: sellerUserId }
        });

        if (!sellerStore) {
            return res.status(403).json({ msg: 'User does not have a store. Only store owners can post products.' });
        }

        if (!req.file) {
            return res.status(400).send({ msg: 'Image file is required.' });
        }
    
        const { product_name, product_price, product_spec, product_desc, product_stock, product_category } = req.body;
        
        const blob = bucket.file(req.file.originalname.replace(/ /g, "_"));
        const blobStream = blob.createWriteStream();
    
        let product_img_url;
    
        await new Promise((resolve, reject) => {
            blobStream.on('error', error => reject(error));
            blobStream.on('finish', () => {
                product_img_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                resolve();
            });
            blobStream.end(req.file.buffer);
        });
    
        const predictResponse = await axios.post(process.env.ML_URL, {
            image_url: product_img_url
        });

        const { 
            accepted: product_acceptance, 
            predicted_class: img_quality 
        } = predictResponse.data.data;

        const product_rate = generateProductRate();

        const newProduct = await product.create({
            product_name,
            product_img: product_img_url,
            product_price,
            product_spec,
            product_desc,
            product_stock,
            product_category,
            product_rate,
            img_quality,
            product_acceptance,
            store_id: sellerStore.store_id
        });

        res.status(201).json({ msg: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const products = await product.findAll({
            where: { product_acceptance: true },
            include: {
                model: store,
                attributes: ['store_name', 'store_location']
            }
        });

        const response = products.map(product => ({
            product_id: product.product_id,
            product_name: product.product_name,
            product_img: product.product_img,
            product_price: product.product_price,
            product_spec: product.product_spec,
            product_desc: product.product_desc,
            product_stock: product.product_stock,
            product_rate: product.product_rate,
            product_category: product.product_category,
            img_quality: product.img_quality,
            product_acceptance: product.product_acceptance,
            created_at: product.created_at,
            store_id: product.store_id,
            store_name: product.store ? product.store.store_name : null,
            store_location: product.store ? product.store.store_location : null
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const searchProductName = async (req, res) => {
    try {
        const { product_name } = req.query;

        if (!product_name || product_name.trim() === '') {
            return res.status(400).json({ msg: 'Product name is required' });
        }

        const products = await product.findAll({
            where: {
                product_acceptance: true,
                product_name: {
                    [Op.like]: `%${product_name}%` // Case-insensitive search
                }
            },
            include: {
                model: store,
                attributes: ['store_name', 'store_location']
            }
        });

        const totalResults = await product.count({
            where: {
                img_quality: 'Normal',
                product_name: {
                    [Op.like]: `%${product_name}%` // Case-insensitive search
                }
            }
        });

        const response = {
            total_results: totalResults,
            products: products.map(product => ({
                product_id: product.product_id,
                product_name: product.product_name,
                product_img: product.product_img,
                product_price: product.product_price,
                product_spec: product.product_spec,
                product_desc: product.product_desc,
                product_stock: product.product_stock,
                product_rate: product.product_rate,
                product_category: product.product_category,
                img_quality: product.img_quality,
                product_acceptance: product.product_acceptance,
                store_id: product.store_id,
                store_name: product.store ? product.store.store_name : null,
                store_location: product.store ? product.store.store_location : null
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getSellerProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerUserId = req.user.user_id;

        const productDetails = await product.findOne({
            where: {
                product_id: productId,
            },
            include: {
                model: store,
                where: { user_id: sellerUserId },
                attributes: ['store_name', 'store_location']
            }
        });

        if (!productDetails) {
            return res.status(404).json({ msg: 'Product not found or you do not have permission to view this product' });
        }

        const response = {
            product_id: productDetails.product_id,
            product_name: productDetails.product_name,
            product_img: productDetails.product_img,
            product_price: productDetails.product_price,
            product_spec: productDetails.product_spec,
            product_desc: productDetails.product_desc,
            product_stock: productDetails.product_stock,
            product_rate: productDetails.product_rate,
            product_category: productDetails.product_category,
            img_quality: productDetails.img_quality,
            product_acceptance: productDetails.product_acceptance,
            created_at: productDetails.created_at,
            updated_at: productDetails.updated_at,
            store_id: productDetails.store_id,
            store_name: productDetails.store.store_name,
            store_location: productDetails.store.store_location
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;

        const productDetails = await product.findOne({
            where: {
                product_id: productId,
            },
            include: {
                model: store,
                attributes: ['store_name', 'store_location']
            }
        });

        if (!productDetails) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const response = {
            product_id: productDetails.product_id,
            product_name: productDetails.product_name,
            product_img: productDetails.product_img,
            product_price: productDetails.product_price,
            product_spec: productDetails.product_spec,
            product_desc: productDetails.product_desc,
            product_stock: productDetails.product_stock,
            product_rate: productDetails.product_rate,
            product_category: productDetails.product_category,
            img_quality: productDetails.img_quality,
            product_acceptance: productDetails.product_acceptance,
            created_at: productDetails.created_at,
            updated_at: productDetails.updated_at,
            store_id: productDetails.store_id,
            store_name: productDetails.store.store_name,
            store_location: productDetails.store.store_location
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Generates a random integer between 1 and 5
const generateProductRate = () => {
    return Math.floor(Math.random() * 5) + 1;
};

module.exports = {
    getProductStore,
    postNewProduct,
    getAllProduct,
    searchProductName,
    getSellerProductById,
    getProductById
}