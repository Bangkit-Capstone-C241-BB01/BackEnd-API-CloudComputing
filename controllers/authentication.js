const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/middleware');

const {
    user,
    store
} = require('../config/database').models;

const userSignUp = async (req, res) => {
    const { 
        user_name, 
        user_email, 
        user_password, 
        user_role, 
        store_name 
    } = req.body;

    console.log(req.body);

    try {
        if (!user_name || !user_email || !user_password || !user_role) {
            return res.status(400).json({ msg: 'All fields cannot be empty' });
        }

        const userEmailExist = await user.findOne({ where: { 
            user_email: req.body.user_email,
        } });

        const userNameExist = await user.findOne ({ where: {
            user_name: req.body.user_name,
        }});

        if (userNameExist) {
            return res.status(400).json({ msg: 'This username is already exist, please input a different usename' });
        }

        if (userEmailExist) {
            return res.status(400).json({ msg: 'This email is already exist, please input a different email' });
        }

        if (!validatePassword(user_password)) {
            return res.status(400).json({ msg: 'Password must be at least 8 characters' });
        }

        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Create new user
        const newUser = await user.create({
            user_name,
            user_email,
            user_password: hashedPassword,
            user_role,
        });

        // Generate token authentication
        const token = generateToken({ 
            user_id: newUser.user_id, 
            user_role: newUser.user_role 
        });

        if (user_role === 'seller') {
            if (!store_name) {
                return res.status(400).json({ msg: 'Store name is required for seller registration' });
            }

            // Create new store
            const newStore = await store.create({
                store_name,
                user_id: newUser.user_id
            });

            return res.status(201).json({ 
                msg: 'User (Seller) has created successfully', 
                token 
            });
        }

        return res.status(201).json({ 
            msg: 'User created successfully', 
            token 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

const userLogin = async (req, res) => {
    const { user_email, user_password } =  req.body;

    try {
        const userExist = await user.findOne({ 
            where: { 
                user_email: user_email,
        }});

        if (!userExist) {
            return res.status(400).json({ msg: 'Invalid email' });
        }

        const passwordMatch = await bcrypt.compare(user_password, userExist.user_password);
        if (!passwordMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        const token = generateToken({ 
            user_id: userExist.user_id, 
            user_role: userExist.user_role 
        });

        return res.status(200).json({ 
            msg: 'User logged in successfully',
            token 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

// Password validation function
const validatePassword = (password) => {
    return password.length >= 8;
};

module.exports = {
    userSignUp,
    userLogin
};