module.exports = (sequelize, DataTypes) => {
    'user', {
        user_id : {
            type: DataTypes.INTREGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name : {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
}