const {
    user,
    store,
    product,
    appeal
} = require('../config/database').models;

const postAppeal = async (req, res) => {
    try {
        const { product_id, appeal_desc } = req.body;
        
        if (!product_id || !appeal_desc) {
            return res.status(400).json({ msg: 'Product ID and appeal description are required' });
        }

        const productExist = await product.findByPk(product_id);
        if (!productExist) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const newAppeal = await appeal.create({
            product_id,
            appeal_desc,
        });

        res.status(201).json({ msg: 'Appeal created successfully', appeal: newAppeal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getAppeal = async (req, res) => {
    try {
        const appeals = await appeal.findAll({
            include: [
                {
                    model: product,
                    attributes: ['product_id', 'product_name', 'product_img', 'img_quality', 'store_id'],
                    include: [
                        {
                            model: store,
                            attributes: ['store_id', 'store_name'],
                            include: [
                                {
                                    model: user,
                                    attributes: ['user_name']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        const response = appeals.map(appeal => ({
            appeal_id: appeal.appeal_id,
            appeal_desc: appeal.appeal_desc,
            product_id: appeal.product.product_id,
            product_name: appeal.product.product_name,
            product_img: appeal.product.product_img,
            img_quality: appeal.product.img_quality,
            store_id: appeal.product.store.store_id,
            store_name: appeal.product.store.store_name,
            user_name: appeal.product.store.user.user_name
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    postAppeal,
    getAppeal
};