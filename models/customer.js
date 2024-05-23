const User = require('./user');

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
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
        phone_number: {
            type: DataTypes.STRING,
        },
        home_address: {
        type: DataTypes.STRING,
        },
        avatar_image: {
            type: DataTypes.STRING,
        },
        }, {
        tableName: 'customer',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Customer;
}

// User.hasOne(Customer, { foreignKey: 'user_id' });
// Customer.belongsTo(User, { foreignKey: 'user_id' });