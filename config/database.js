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

// Create table using Sequelize
// sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");

module.exports = sequelize;