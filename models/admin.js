module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define(
        'admin', 
        {
            admin_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false, //reference from user table
            },
        }, 
        {
            sequelize,
            tableName: 'admin',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true,
        },
    );

    return admin;
}

//ASSOCIATION: user hasMany admin, admin belongsTo user (One to Many) - Foreign key: user_id