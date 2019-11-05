module.exports = function (sequelize, DataTypes) {
    var checkins = sequelize.define("checkins", {
        REST_ID: DataTypes.TEXT,
        USER_EMAIL: DataTypes.TEXT,
        CURRENT_WAIT: DataTypes.INTEGER,
        PARTY_SIZE: DataTypes.INTEGER,
        WAIT_ACTIVE: DataTypes.BOOLEAN
    });
    return checkins;
};