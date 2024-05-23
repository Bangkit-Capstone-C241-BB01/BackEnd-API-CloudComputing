const User = require('./user');

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
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
        }, {
        tableName: 'admin',
        timestamps: false,
    });

    return Admin;
}

// User.hasOne(Admin, { foreignKey: 'user_id' });
// Admin.belongsTo(User, { foreignKey: 'user_id' });