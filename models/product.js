module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define(
        'product', 
        {
            product_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_img: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_price: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_spec: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            product_desc: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            product_stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_rate: {
                type: DataTypes.DECIMAL(2, 1),
                allowNull: false,
            },
            product_category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            img_quality: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_acceptance: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            store_id: {
                type: DataTypes.INTEGER,
                allowNull: false, //reference from store table
            },
        }, 
        {
            sequelize,
            tableName: 'product',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true,
        },
    );

    return product;
};

//ASSOCIATION: store hasMany product, product belongsTo store (one to many) - Foreign key: store_id