module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define(
        'customer', 
        {
            customer_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            customer_phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            customer_address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            customer_img: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false, //reference from user table
            },
        }, 
        {
            sequelize,
            tableName: 'customer',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true,
        },
    );

    return customer;
}

//ASSOCIATION: user hasMany customer, customer belongsTo customer - Foreign key: user_id