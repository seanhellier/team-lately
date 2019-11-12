var db = require('../models');

module.exports = function(app) {
	// Create a new example
	// app.post("/api/examples", function (req, res) {
	//   db.Example.create(req.body).then(function (dbExample) {
	//     res.json(dbExample);
	//   });
	// });

	// // Delete an example by id
	// app.delete("/api/examples/:id", function (req, res) {
	//   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
	//     res.json(dbExample);
	//   });
	// });

	// <!--==========================
	// API Routes for app
	// ============================-->

	// Get data on resturant selected
	// app.get("/api/checkins/", function (req, res) {
	//   db.checkins.findAll({
	//     where: {
	//       REST_ID: "11"
	//     }
	//   }).then(function (dbcheckins) {
	//     // res.json(dbcheckins);
	//     res.redirect('/')
	//   });
	// });

	// Averages objects
	app.get('/api/checkinave/', function(req, res) {
		db.checkins
			.findAll({
				attributes: [ 'REST_ID', [ sequelize.fn('count', sequelize.col('REST_ID')), 'count' ] ],
				group: [ 'checkins.itemId' ],
				raw: true,
				order: sequelize.literal('count DESC')
			})
			.then(function(average) {
				// res.json( average );

				res.redirt('/');
			});
	});

	// Add a new checkin to the database
	app.post('/api/checkins', function(req, res) {
		console.log(req.body);
		db.checkins
			.create({
				REST_ID: 11,
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
			.then(function(dbcheckins) {
				res.redirect('/');
			});
	});

	// restaurants zomato data
	app.post('/api/restData', function(req, res) {
		console.log('this is restData');
		// console.log(req.body);
		for (let i = 0; i < req.body.length; i++) {
			// console.log(i);
			// console.log(req.body[i].rest_name);

			db.Restaurants
				.create({
					REST_ID: req.body[i].rest_id,
					REST_NAME: req.body[i].rest_name,
					REST_CUISINES: req.body[i].rest_cuisines,
					REST_LAT: req.body[i].rest_lat,
					REST_LONG: req.body[i].rest_long,
					REST_ADDRESS: req.body[i].rest_address,
					REST_IMAGE: req.body[i].rest_image
				})
				.then(function(dbrestaurants) {
					console.log(dbrestaurants);
					// res.redirect('/');
				});
		}
		res.json('restData route hit');
	});

	// Update database for when user has checked in
	app.put('/api/checkinconfirm', function(req, res) {
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
			.then(function(dbcheckins) {
				res.redirect('/');
			});
	});
};
