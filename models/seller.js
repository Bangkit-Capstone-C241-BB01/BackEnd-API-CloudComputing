const User = require('./user');
const Store = require('./store');

module.exports = (sequelize, DataTypes) => {
    const Seller = sequelize.define('Seller', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User,
                key: 'user_id',
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        store_name: {
            type: DataTypes.STRING,
            references: {
                model: Store,
                key: 'store_name',
            },
        },
        }, {
        tableName: 'seller',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Seller;
}

// User.hasOne(Seller, { foreignKey: 'user_id' });
// Seller.belongsTo(User, { foreignKey: 'user_id' });