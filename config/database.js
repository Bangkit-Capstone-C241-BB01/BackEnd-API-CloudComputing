const { Sequelize } = require('sequelize');
const associateModels = require('../models/models')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_CONNECTION_NAME,
        dialect: 'mysql',
    }
);

module.exports = sequelize;

(async () => {
    const User = require('../models/user');
    const Admin = require('../models/admin');
    const Seller = require('../models/seller');
    const Customer = require('../models/customer');
    const Store = require('../models/store');
    const Product = require('../models/product');
    const Category = require('../models/category');

    associateModels({
        User,
        Admin,
        Seller,
        Customer,
        Store,
        Product,
        Category,
    });

    await sequelize.sync({ force: false });
    console.log('Database & tables created!');
})();