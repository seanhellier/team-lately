module.exports = function (sequelize, DataTypes) {
	var Restaurants = sequelize.define('Restaurants', {
		REST_ID: { type: DataTypes.INTEGER, unique: true },
		REST_NAME: DataTypes.STRING,
		REST_CUISINES: DataTypes.STRING,
		REST_LAT: DataTypes.DECIMAL(10,7),
		REST_LONG: DataTypes.DECIMAL(10,7),
		REST_ADDRESS: DataTypes.STRING,
		REST_IMAGE: DataTypes.STRING
	});

    Restaurants.associate = function(models){
        Restaurants.hasMany(models.checkins, {onDelete: "cascade"})
    }
	return Restaurants;
};
