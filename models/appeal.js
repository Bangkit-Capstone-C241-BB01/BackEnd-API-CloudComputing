module.exports = (sequelize, DataTypes) => {
    const appeal = sequelize.define(
      'appeal',
      { 
        appeal_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        appeal_desc: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'appeal',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true,
      }
    );

    return appeal;
};

//ASSOCIATION: product hasOne appeal, appeal belongs to product (one to one) - Foreign key: product_id