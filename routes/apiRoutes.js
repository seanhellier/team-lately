var db = require('../models');
var axios = require('axios');

module.exports = function(app) {
	// // Create a new example
	// app.post('/api/examples', function(req, res) {
	// 	db.Example.create(req.body).then(function(dbExample) {
	// 		res.json(dbExample);
	// 	});
	// });

	// // Delete an example by id
	// app.delete('/api/examples/:id', function(req, res) {
	// 	db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
	// 		res.json(dbExample);
	// 	});
	// });

	// <!--==========================
	// API Routes for app
	// ============================-->

	// Get data on resturant selected
	// axios.get('/api/restData', function(req, res) {
	// 	// console.log(req.body);
	// 	// // loop over restArr will become rest.body (put all dbcheckin inside loop)
	// 	var restHDOBJ = [];
	// 	for (var i = 0; i < restArr.length; i++) {
	// 		db.checkins
	// 			.findALL({
	// 				where: {
	// 					REST_ID: restArr.rest_id
	// 				},
	// 				attributes: [ 'waitTime', [ sequelize.fn('AVG', Sequelize.col('CURRENT_WAIT')) ] ]
	// 			})
	// 			.then(function() {
	// 				console.log(restArr[i].rest_id, 'waiting:', waitTime, 'minutes on average.');
	// 				// if no restaurant data exists in db, save new data  db response into restHDOBJ
	// 				// if (data===null){
	// 				// 	console.log('no restaurant data found');
	// 				// }
	// 				// // else don't need to save; add to object
	// 				// else {
	// 				// 	restHDOBJ.push
	// 				// 		{

	// 				// 		}
	// 				// 	)
	// 				// }
	// 			});
	// 	}
	// 	res.json(restHDOBJ);
	// });

	// // // Get data on resturant selected
	// // app.get("/api/checkins/", function (req, res) {
	// //   db.checkins.findAll({
	// //     where: {
	// //       REST_ID: "11"
	// //     }
	// //   }).then(function (dbcheckins) {
	//     res.json(dbcheckins);
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
				res.json(average);
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
				WAIT_ACTIVE: 1
			})
			.then(function(dbcheckins) {
				res.redirect('/');
			});
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
