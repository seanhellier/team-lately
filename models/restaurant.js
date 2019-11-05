module.exports = function (sequelize, DataTypes) {
    var restaurant = sequelize.define("restaurant", {
        REST_ID: DataTypes.STRING,
        REST_NAME: DataTypes.TEXT,
        LOCATION_CODE: DataTypes.TEXT,
        CURRENTLY_WAIT: DataTypes.TEXT,
        AVG_SM_PARTY_WAIT: DataTypes.TEXT,
        AVG_LG_PARTY_WAIT: DataTypes.TEXT
    });
    return restaurant;

};