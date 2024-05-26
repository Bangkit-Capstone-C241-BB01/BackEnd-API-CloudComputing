const { Sequelize } = require('sequelize');
const { initModels } = require('../models/models');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_CONNECTION_NAME,
        dialect: 'mysql',
    }
);

initModels(sequelize);

module.exports = sequelize;