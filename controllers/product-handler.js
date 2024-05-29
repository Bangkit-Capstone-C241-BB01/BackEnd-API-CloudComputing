const {
    user,
    store,
    product
} = require('../config/database').models;
const { Op } = require('sequelize');

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

        const { product_name, product_img, product_price, product_spec, product_desc, product_stock, product_category, img_quality } = req.body;

        const product_rate = generateProductRate();

        const newProduct = await product.create({
            product_name,
            product_img,
            product_price,
            product_spec,
            product_desc,
            product_stock,
            product_category,
            product_rate,
            img_quality,
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
                product_name: {
                    [Op.like]: `%${product_name}%` // Case-insensitive search
                }
            },
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

// Generates a random integer between 1 and 5
const generateProductRate = () => {
    return Math.floor(Math.random() * 5) + 1;
};

module.exports = {
    getProductStore,
    postNewProduct,
    getAllProduct,
    searchProductName
}