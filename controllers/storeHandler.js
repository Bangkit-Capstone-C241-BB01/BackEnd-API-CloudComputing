const {
    user,
    store,
    product
} = require('../config/database').models;

const getSellerStore = async (req, res) => {
    try {
        const sellerUserId = req.user.user_id;

        const storeAll = await store.findOne({
            where: { user_id: sellerUserId },
            attributes: ['store_id', 'store_name', 'store_img', 'store_desc', 'store_rate', 'store_location', 'created_at', 'updated_at'],
        });

        const sellerStore = await user.findOne({
            where: { user_id: sellerUserId },
            attributes: ['user_id', 'user_name'],
        });

        if (!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        const response = {
            store_id: storeAll.store_id,
            store_name: storeAll.store_name,
            store_img: storeAll.store_img,
            store_desc: storeAll.store_desc,
            store_rate: storeAll.store_rate,
            store_location: storeAll.store_location,
            user_id: sellerStore.user_id,
            user_name: sellerStore.user_name
        };
        res.status(200).json(response);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const updateSellerStore = async (req, res) => {

};

const getAllStore = async (req, res) => {
    try {
        const allStores = await store.findAll({
            attributes: ['store_id', 'store_name', 'store_img', 'store_desc', 'store_rate', 'store_location', 'created_at', 'updated_at'],
            include: [
                {
                    model: user,
                    attributes: ['user_id', 'user_name']
                }
            ]
        });

        const response = allStores.map(store => ({
            store_id: store.store_id,
            store_name: store.store_name,
            store_img: store.store_img,
            store_desc: store.store_desc,
            store_rate: store.store_rate,
            store_location: store.store_location,
            user_id: store.user ? store.user.user_id : null,
            user_name: store.user ? store.user.user_name : null,
            created_at: store.created_at,
            updated_at: store.updated_at
        }));
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    getSellerStore,
    updateSellerStore,
    getAllStore
};