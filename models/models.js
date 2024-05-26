const { DataTypes} = require('sequelize');
const userTab = require('./user')
const adminTab = require('./admin');
const customerTab = require('./customer');
const sellerTab = require('./seller');
const storeTab = require('./store');
const productTab = require('./product');

function initModels(sequelize) {
    const user = userTab(sequelize, DataTypes);
    const admin = adminTab(sequelize, DataTypes);
    const customer = customerTab(sequelize, DataTypes);
    const seller = sellerTab(sequelize, DataTypes);
    const store = storeTab(sequelize, DataTypes);
    const product = productTab(sequelize, DataTypes);
    
    user.hasMany(admin);
    admin.belongsTo(user, {
        foreignKey: 'user_id',
    });

    user.hasMany(seller);
    seller.belongsTo(user, {
        foreignKey: 'user_id',
    });

    user.hasMany(customer);
    customer.belongsTo(user, {
        foreignKey: 'user_id',
    });

    seller.hasOne(store);
    store.belongsTo(seller, {
        foreignKey: 'seller_id',
    });

    store.hasMany(product);
    product.belongsTo(store, {
        foreignKey: 'store_id',
    });

    return{ user, admin, customer, seller, store, product};
};

module.exports.initModels = initModels;