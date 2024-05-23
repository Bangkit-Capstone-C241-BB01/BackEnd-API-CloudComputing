const Seller = require('./seller');
const Category = require('./category');


module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_image: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        specification: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(3, 2),
        },
        seller_id: {
            type: DataTypes.INTEGER,
            references: {
            model: Seller,
            key: 'user_id',
            },
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'category_id',
            },
        },
        }, {
        tableName: 'product',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Product;
}

// Seller.hasMany(Product, { foreignKey: 'seller_id' });
// Product.belongsTo(Seller, { foreignKey: 'seller_id' });

// Store.hasMany(Product, { foreignKey: 'store_id' });
// Product.belongsTo(Store, { foreignKey: 'store_id' });

// Category.hasMany(Product, { foreignKey: 'category_id' });
// Product.belongsTo(Category, { foreignKey: 'category_id' });