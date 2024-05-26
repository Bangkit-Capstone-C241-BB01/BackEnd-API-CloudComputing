module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_role: {
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
    },
  );
    
  return user;
};