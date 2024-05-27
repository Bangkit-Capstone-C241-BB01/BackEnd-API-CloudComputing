const { DataTypes} = require('sequelize');
const userTab = require('./user');
const storeTab = require('./store');
const productTab = require('./product');

function initModels(sequelize) {
    const user = userTab(sequelize, DataTypes);
    const store = storeTab(sequelize, DataTypes);
    const product = productTab(sequelize, DataTypes);

    user.hasOne(store);
    store.belongsTo(user, {
        foreignKey: 'user_id',
    });

    store.hasMany(product);
    product.belongsTo(store, {
        foreignKey: 'store_id',
    });

    return{ user, store, product };
};

module.exports.initModels = initModels;