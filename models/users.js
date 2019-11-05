module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define("users", {
        // USER_ID: DataTypes.STRING,
        // USERNAME: DataTypes.TEXT,
        EMAIL: DataTypes.TEXT,
        POINTS: DataTypes.TEXT,
        // LAST_CHECKIN: DataTypes.TEXT,
        STATUS: DataTypes.BOOLEAN
    });
    return users;
};