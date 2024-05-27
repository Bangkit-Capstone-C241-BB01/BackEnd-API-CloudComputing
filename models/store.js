module.exports = (sequelize, DataTypes) => {
    const store = sequelize.define(
        'store', 
        {
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
            store_img: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            store_desc: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            store_rate: {
                type: DataTypes.DECIMAL(3, 2),
                allowNull: true,
            },
            store_location: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }, 
        {
            sequelize,
            tableName: 'store',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true,
        },
    );

    return store;
};

//ASSOCIATION: user hasOne store, store belongs to user (One to One) - Foreign key: user_id