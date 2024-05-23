const Seller = require('./seller');

modules.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        store_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        store_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        store_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        store_description: {
            type: DataTypes.TEXT,
        },
        rating: {
            type: DataTypes.DECIMAL(3, 2),
        },
        location: {
            type: DataTypes.STRING,
        },
        seller_id: {
            type: DataTypes.INTEGER,
            unique: true,
            references: {
                model: Seller,
                key: 'user_id',
            },
        },
        }, {
        tableName: 'store',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Store;
}

// Seller.hasOne(Store, { foreignKey: 'seller_id' });
// Store.belongsTo(Seller, { foreignKey: 'seller_id' });