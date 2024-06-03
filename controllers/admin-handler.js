const {
    user,
    store,
    product,
    appeal
} = require('../config/database').models;

const dashboard = async (req, res) => {
    try {
        const products = await product.findAll({
            include: [
                {
                    model: store,
                    attributes: ['store_id', 'store_name'],
                    include: [
                        {
                            model: user,
                            attributes: ['user_id', 'user_name', 'user_email']
                        }
                    ]
                }
            ],
            attributes: ['product_id', 'product_name', 'img_quality', 'store_id']
        });

        const response = products.map(product => ({
            product_id: product.product_id,
            product_name: product.product_name,
            img_quality: product.img_quality,
            store_id: product.store.store_id,
            store_name: product.store.store_name,
            user_id: product.store.user.user_id,
            user_name: product.store.user.user_name,
            user_email: product.store.user.user_email
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const totals = async (req, res) => {
    try {
        const totalUsers = await user.count();

        const totalSales = await product.count();

        const totalOrders = await generatedTotalOrders();

        res.status(200).json({
            total_users: totalUsers,
            total_sales: totalSales,
            total_orders: totalOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const approveImgQuality = async (req, res) => {
    try {
        const { appeal_id } = req.body;
        const user_id = req.user.user_id;

        const currentUser = await user.findByPk(user_id);

        if (!currentUser || currentUser.user_role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
        }

        const appealUpdate = await appeal.findByPk(appeal_id, {
            include: {
                model: product
            }
        });

        if (!appealUpdate) {
            return res.status(404).json({ msg: 'Appeal not found' });
        }

        const { product } = appealUpdate;
        product.product_acceptance = true;
        product.img_quality = 'Normal';
        await product.save();
        
        appealUpdate.is_admin_checked = true;
        await appealUpdate.save();

        res.status(200).json({ 
            msg: 'Product image quality approved and appeal checked', 
            appeal: appealUpdate 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const rejectImgQuality = async (req, res) => {
    try {
        const { appeal_id } = req.body;
        const user_id = req.user.user_id;

        const currentUser = await user.findByPk(user_id);

        if (!currentUser || currentUser.user_role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
        }

        const appealDelete = await appeal.findByPk(appeal_id, {
            include: {
                model: product
            }
        });

        if (!appealDelete) {
            return res.status(404).json({ msg: 'Appeal not found' });
        }

        if (appealDelete.product) {
            await appealDelete.product.destroy();
        }

        await appealDelete.destroy();

        res.status(200).json({ 
            msg: 'Image quality appeal rejected and product deleted' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const generatedTotalOrders = () => {
    return Math.floor(Math.random() * 50) + 1;
};

module.exports = {
    dashboard,
    totals,
    approveImgQuality,
    rejectImgQuality
};