const bcrypt = require('bcryptjs');
const db = require('../models/models');
const { generateToken } = require('../middleware/middleware');

const {
    user,
    admin,
    customer,
    seller,
    store,
    product
} = require('../config/database').models;

const userSignUp = async (req, res) => {
    const { user_name, user_email, user_password, user_role, store_name } = req.body;

    try {
        // Check if user with the same email already exists
        const userExist = await user.findOne({ where: { user_email } });
        if (userExist) {
            return res.status(400).json({ 
                msg: 'This email is already exist' 
            });
        }

        // Password validation
        if (!validatePassword(user_password)) {
            return res.status(400).json({ 
                msg: 'Password must be at least 8 characters long' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Create the user
        const newUser = await user.create({
            user_name,
            user_email,
            user_password: hashedPassword,
            user_role,
        });

        // Generate token for user
        const token = generateToken({ 
            user_id: newUser.user_id, 
            user_role: newUser.user_role 
        });

        // If the user role is 'seller', create a store for them
        if (user_role === 'seller') {
            if (!store_name) {
                return res.status(400).json({ msg: 'Store name is required for seller registration' });
            }

            const newSeller = await seller.create({
                user_id: newUser.user_id,
            })

            // Create the store
            const newStore = await store.create({
                store_name,
            });

            return res.status(201).json({ 
                msg: 'Seller user has created successfully', 
                token 
            });
        }

        // If the user role is 'customer', create a customer profile for them
        if (user_role === 'customer') {
            const newCustomer = await customer.create({
                user_id: newUser.user_id,
            });

            return res.status(201).json({ msg: 
                'Customer user has created successfully', 
                token 
            });
        }

        // If the user role is 'admin', create an admin profile for them
        if (user_role === 'admin') {
            const newAdmin = await admin.create({
                user_id: newUser.user_id,
            });

            return res.status(201).json({ 
                msg: 'User and admin profile created successfully', 
                token 
            });
        }

        return res.status(201).json({ 
            msg: 'User created successfully', 
            token 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            msg: 'Internal server error' 
        });
    }
};

const userLogin = async (req, res) => {
    const { user_email, user_password } =  req.body;

    try {
        // Check if user with the provided email exists
        const userExist = await user.findOne({ where: { user_email } });
        if (!userExist) {
            return res.status(400).json({ 
                msg: 'Invalid email or password' 
            });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(user_password, userExist.user_password);
        if (!passwordMatch) {
            return res.status(400).json({ 
                msg: 'Invalid email or password' 
            });
        }

        // Generate token for user
        const token = generateToken({ 
            user_id: userExist.user_id, 
            user_role: userExist.user_role 
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            msg: 'Internal server error' 
        });
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