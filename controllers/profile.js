const {
    user,
    store
} = require('../config/database').models;
const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    // keyFilename: process.env.SERVICE_ACCOUNT_KEY,
});

const bucket = storage.bucket(process.env.BUCKET_PROFILE_NAME);

const getProfile = async (req, res) => {
    try {
        const userProfileId = req.user.user_id;
        console.log(userProfileId);
        const userProfile = await user.findOne({
            where: { 
                user_id: userProfileId
            },
            attributes: ['user_id', 'user_name', 'user_email', 'user_role', 'user_password', 'user_phone', 'user_address', 'user_img', 'created_at', 'updated_at' ],
        });

        const userStore = await store.findOne({
            where: { 
                user_id: userProfileId 
            },
            attributes: ['store_id', 'store_name']
        });

        if (!userProfile && !userStore) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (userProfile.user_role === "seller") {
            const response = {
                user_id: userProfile.user_id,
                user_name: userProfile.user_name,
                user_email: userProfile.user_email,
                user_role: userProfile.user_role,
                user_password: userProfile.user_password,
                user_img: userProfile.user_img,
                store_id: userStore ? userStore.store_id : null,
                store_name: userStore ? userStore.store_name : null,
                created_at: userProfile.created_at,
                updated_at: userProfile.updated_at
            };
            res.status(200).json(response);
        };
        
        if (userProfile.user_role === "customer") {
            const response = {
                user_id: userProfile.user_id,
                user_name: userProfile.user_name,
                user_email: userProfile.user_email,
                user_role: userProfile.user_role,
                user_password: userProfile.user_password,
                user_phone: userProfile.user_phone,
                user_address: userProfile.user_address,
                user_img: userProfile.user_img,
                created_at: userProfile.created_at,
                updated_at: userProfile.updated_at
            };
            res.status(200).json(response);
        };

        if (userProfile.user_role === "admin") {
            const response = {
                user_id: userProfile.user_id,
                user_name: userProfile.user_name,
                user_email: userProfile.user_email,
                user_role: userProfile.user_role,
                user_password: userProfile.user_password,
                created_at: userProfile.created_at,
                updated_at: userProfile.updated_at
            };
            res.status(200).json(response);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userProfileId = req.user.user_id;
        const { user_name, user_email, user_phone, user_address } = req.body;

        const userExist = await user.findOne({ 
            where: { user_id: userProfileId } 
        });
        
        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        let user_img_url = userExist.user_img;

        if (req.file) {
            const blob = bucket.file(req.file.originalname.replace(/ /g, "_"));
            const blobStream = blob.createWriteStream();

            await new Promise((resolve, reject) => {
                blobStream.on('error', error => reject(error));
                blobStream.on('finish', () => {
                    user_img_url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    resolve();
                });
                blobStream.end(req.file.buffer);
            });
        }

        await userExist.update({
            user_name: user_name || userExist.user_name, // Keep the existing value if not provided
            user_email: user_email || userExist.user_email,
            user_phone: user_phone || userExist.user_phone,
            user_address: user_address || userExist.user_address,
            user_img: user_img_url
        });

        const userUpdated = await user.findOne({ 
            where: { user_id: userProfileId } 
        });

        const userStore = await store.findOne({
            where: { user_id: userProfileId },
            attributes: ['store_id', 'store_name']
        });

        if (userUpdated.user_role === "seller") {
            const response = {
                msg: "Your profile have been updated",
                data: {
                    user_id: userUpdated.user_id,
                    user_name: userUpdated.user_name,
                    user_email: userUpdated.user_email,
                    user_role: userUpdated.user_role,
                    user_img: userUpdated.user_img,
                    store_id: userStore ? userStore.store_id : null,
                    store_name: userStore ? userStore.store_name : null,
                    created_at: userUpdated.created_at,
                    updated_at: userUpdated.updated_at
                }
            };
            res.status(200).json(response);
        };

        if (userUpdated.user_role === "customer") {
            const response = {
                msg: "Your profile have been updated",
                data: {
                    user_id: userUpdated.user_id,
                    user_name: userUpdated.user_name,
                    user_email: userUpdated.user_email,
                    user_role: userUpdated.user_role,
                    user_phone: userUpdated.user_phone,
                    user_address: userUpdated.user_address,
                    user_img: userUpdated.user_img,
                    created_at: userUpdated.created_at,
                    updated_at: userUpdated.updated_at
                }
            };
            res.status(200).json(response);
        };

        if (userUpdated.user_role === "admin") {
            const response = {
                msg: "Your profile have been updated",
                data: {
                    user_id: userUpdated.user_id,
                    user_name: userUpdated.user_name,
                    user_email: userUpdated.user_email,
                    user_role: userUpdated.user_role,
                    created_at: userUpdated.created_at,
                    updated_at: userUpdated.updated_at
                }
            };
            res.status(200).json(response);
        };

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};