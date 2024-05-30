const {
    user,
    store
} = require('../config/database').models;

const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.SERVICE_ACCOUNT_KEY
});

const bucket = storage.bucket(process.env.BUCKET_STORE_NAME);

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
    try {
        const sellerUserId = req.user.user_id;
        const { store_desc, store_location } = req.body;

        let store_rate = req.body.store_rate;

        const sellerStore = await store.findOne({
            where: { user_id: sellerUserId },
        });

        if (store_rate === undefined) {
            store_rate = generateStoreRate();
        }

        if (!sellerStore) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        let store_img_url;

        if (req.file) {
            const blob = bucket.file(req.file.originalname.replace(/ /g, "_"));
            const blobStream = blob.createWriteStream();

            await new Promise((resolve, reject) => {
                blobStream.on('error', error => reject(error));
                blobStream.on('finish', () => {
                    store_img_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    resolve();
                });
                blobStream.end(req.file.buffer);
            });
        }

        await sellerStore.update({
            store_img: store_img_url || sellerStore.store_img,
            store_desc,
            store_rate,
            store_location
        });

        res.status(200).json({ msg: 'Store updated successfully', store: sellerStore });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
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
            ],
            order: [
                ['store_name', 'ASC'],
                ['created_at', 'DESC']
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

// Generates a random integer between 1 and 5
const generateStoreRate = () => {
    return Math.floor(Math.random() * 5) + 1;
};

module.exports = {
    getSellerStore,
    updateSellerStore,
    getAllStore
};