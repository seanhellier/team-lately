var db = require('../models');

module.exports = function (app) {
	//
	// app.get('/api/checkinave/', function (req, res) {
	// 	db.checkins
	// 		.findAll({
	// 			attributes: ['REST_ID', [sequelize.fn('count', sequelize.col('REST_ID')), 'count']],
	// 			group: ['checkins.itemId'],
	// 			raw: true,
	// 			order: sequelize.literal('count DESC')
	// 		})
	// 		.then(function (average) {
	// 			// res.json( average );
	//
	// 			res.redirect('/');
	// 		});
	// });

	// Add a new checkin to the database
	app.post('/api/checkins/:restID', async function (req, res) {
		console.log(req.body);
		console.log(req.params.restID);
		const restID = req.params.restID
		const restData = await db.Restaurants.findOne({
			where: {REST_ID: restID},
		})
		db.checkins.create({
			REST_ID: restData.REST_ID,
			USER_EMAIL: req.body.USER_EMAIL,
			CURRENT_WAIT: req.body.CURRENT_WAIT,
			PARTY_SIZE: req.body.PARTY_SIZE,
			WAIT_ACTIVE: 1,
			REST_NAME: req.body.REST_NAME,
			REST_CUISINES: req.body.REST_CUISINES,
			REST_LAT: req.body.REST_LAT,
			REST_LONG: req.body.REST_LONG,
			REST_ADDRESS: req.body.REST_ADDRESS,
			REST_IMAGE: req.body.REST_IMAGE
		})
		.then(function (dbcheckins) {
			res.redirect('/');
		});
	});

	// restaurants zomato data
	app.post('/api/restData', function (req, res) {
		// console.log('this is restData');
		// console.log(req.body);
		for (let i = 0; i < req.body.length; i++) {
			db.Restaurants
				.findOrCreate(
					{
			      where: {
			        REST_ID: req.body[i].rest_id,
			      },
						defaults: {
							REST_NAME: req.body[i].rest_name,
							REST_CUISINES: req.body[i].rest_cuisines,
							REST_LAT: req.body[i].rest_lat,
							REST_LONG: req.body[i].rest_long,
							REST_ADDRESS: req.body[i].rest_address,
							REST_IMAGE: req.body[i].rest_image
						}
			    })
				.catch((error)=>{

					console.log(error);
										console.log("ERROR")
				})
		}
		res.json('restData route hit');
	});

	// Update database for when user has checked in
	app.put('/api/checkinconfirm', function (req, res) {
		console.log("yea")
		db.checkins
			.update(
				{
					WAIT_ACTIVE: 0
				},
				{
					where: {
						id: 19
					}
				}
			)
			.then(function (dbcheckins) {
				res.redirect('/');
			});
	});
};
