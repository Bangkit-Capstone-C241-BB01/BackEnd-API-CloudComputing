module.exports = (sequelize, DataTypes) => {
    const seller = sequelize.define(
        'seller', 
        {
            seller_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            seller_img: {
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
            tableName: 'seller',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true,
        },
    );

    return seller;
};

//ASSOCIATION: user hasMany seller, seller belongsTo user (One to Many) - Foreign key: user_id