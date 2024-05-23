const associateModels = (models) => {
    const { User, Admin, Seller, Customer, Store, Product, Category } = models;

    User.hasOne(Admin, { foreignKey: 'user_id' });
    Admin.belongsTo(User, { foreignKey: 'user_id' });

    User.hasOne(Seller, { foreignKey: 'user_id' });
    Seller.belongsTo(User, { foreignKey: 'user_id' });

    User.hasOne(Customer, { foreignKey: 'user_id' });
    Customer.belongsTo(User, { foreignKey: 'user_id' });

    Seller.hasOne(Store, { foreignKey: 'seller_id' });
    Store.belongsTo(Seller, { foreignKey: 'seller_id' });

    Seller.hasMany(Product, { foreignKey: 'seller_id' });
    Product.belongsTo(Seller, { foreignKey: 'seller_id' });

    Store.hasMany(Product, { foreignKey: 'store_id' });
    Product.belongsTo(Store, { foreignKey: 'store_id' });

    Category.hasMany(Product, { foreignKey: 'category_id' });
    Product.belongsTo(Category, { foreignKey: 'category_id' });
};

module.exports = associateModels;