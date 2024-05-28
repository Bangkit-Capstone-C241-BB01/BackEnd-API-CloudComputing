const { DataTypes} = require('sequelize');
const userTab = require('./user');
const storeTab = require('./store');
const productTab = require('./product');
const appealTab = require('./appeal');

function initModels(sequelize) {
    const user = userTab(sequelize, DataTypes);
    const store = storeTab(sequelize, DataTypes);
    const product = productTab(sequelize, DataTypes);
    const appeal = appealTab(sequelize, DataTypes);

    user.hasOne(store);
    store.belongsTo(user, {
        foreignKey: 'user_id',
    });

    store.hasMany(product);
    product.belongsTo(store, {
        foreignKey: 'store_id',
    });

    product.hasOne(appeal);
    appeal.belongsTo(product, {
        foreignKey: 'product_id',
    });

    return{ user, store, product, appeal };
};

module.exports.initModels = initModels;