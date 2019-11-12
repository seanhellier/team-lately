module.exports = function(sequelize, DataTypes) {
	var Restaurants = sequelize.define('Restaurants', {
		REST_ID: DataTypes.INTEGER,
		REST_NAME: DataTypes.STRING,
		REST_CUISINES: DataTypes.STRING,
		REST_LAT: DataTypes.INTEGER,
		REST_LONG: DataTypes.INTEGER,
		REST_ADDRESS: DataTypes.STRING,
		REST_IMAGE: DataTypes.STRING
	});
	return Restaurants;
};
