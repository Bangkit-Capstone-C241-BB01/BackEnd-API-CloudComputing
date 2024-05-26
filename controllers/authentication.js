const bcrypt = require('bcryptjs');
const db = require('../models/models');
const { generateToken } = require('../middleware')

const userSignUp = async (req, res) => {
    const {
        user_name, 
        user_email, 
        user_password, 
        role,
    } = req.body;
    try {
        // Check if user already exists
        const existingUser = await db.User.findOne({ where: { user_email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Create new user
        const newUser = await db.User.create({
            user_name,
            user_email,
            user_password: hashedPassword,
            user_role: role
        });

        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userLogin = async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
        // Check if user exists
        const user = await db.User.findOne({ where: { user_email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(user_password, user.user_password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken({ user_id: user.user_id, user_role: user.user_role });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    userSignUp,
    userLogin
};