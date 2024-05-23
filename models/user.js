module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        role: {
            type: DataTypes.ENUM('admin', 'seller', 'customer'),
            allowNull: false,
            defaultValue: 'customer', //Default role is customer
        },
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true,
      }
    );

    // Define hook to automatically associate user with role table
    User.afterCreate(async (user, options) => {
        const { role } = user;
        if (role === 'admin') {
            await sequelize.models.Admin.create({ user_id: user.user_id });
        } else if (role === 'seller') {
            await sequelize.models.Seller.create({ user_id: user.user_id });
        } else if (role === 'customer') {
            await sequelize.models.Customer.create({ user_id: user.user_id });
        }
    });
  
    return User;
};