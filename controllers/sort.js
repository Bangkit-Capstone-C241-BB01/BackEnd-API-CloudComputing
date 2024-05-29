const {
    user,
    store,
    product
} = require('../config/database').models;

const sortProductByRate = async (req, res) => {
    try {
        const products = await product.findAll({
            include: {
                model: store,
                attributes: ['store_name', 'store_location']
            },
            order: [['product_rate', 'DESC']]
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
            store_name: product.store ? product.store.store_name : null,
            store_location: product.store ? product.store.store_location : null
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const sortStoreByRate = async (req, res) => {
    try {
        const stores = await store.findAll({
            include:{
                model: user,
                attributes: ['user_id', 'user_name']
            },
            order: [['store_rate', 'DESC']]
        });

        const response = stores.map(store => ({
            store_id: store.store_id,
            store_name: store.store_name,
            store_img: store.store_img,
            user_id: store.user_id,
            store_rate: store.store_rate,
            user_id: store.user ? store.user.user_id : null,
            user_name: store.user ? store.user.user_name : null
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const sortProductByNewest = async (req, res) => {
    try {
        const products = await product.findAll({
            include: {
                model: store,
                attributes: ['store_name']
            },
            order: [['created_at', 'DESC']]
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
            store_name: product.store.store_name,
            created_at: product.created_at,
            updated_at: product.updated_at
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const sortProductByLocation = async (req, res) => {
    try {
        const products = await product.findAll({
            include: {
                model: store,
                attributes: ['store_name', 'store_location']
            },
            order: [[store, 'store_location', 'ASC']]
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
            store_name: product.store.store_name,
            store_location: product.store.store_location,
            created_at: product.created_at
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    sortProductByRate,
    sortStoreByRate,
    sortProductByNewest,
    sortProductByLocation
};