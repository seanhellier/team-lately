module.exports = function (sequelize, DataTypes) {
	var Restaurants = sequelize.define('Restaurants', {
		REST_ID: {
			type: DataTypes.INTEGER,
      primaryKey: true
		},
		REST_NAME: DataTypes.STRING,
		REST_CUISINES: DataTypes.STRING,
		REST_LAT: DataTypes.DECIMAL(10,7),
		REST_LONG: DataTypes.DECIMAL(10,7),
		REST_ADDRESS: DataTypes.STRING,
		REST_IMAGE: DataTypes.STRING
	});

    Restaurants.associate = function(models){
        Restaurants.hasMany(models.checkins, {
					foreignKey: 'REST_ID'
				 })
    }
	return Restaurants;
};
