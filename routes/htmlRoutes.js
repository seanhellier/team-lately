var db = require('../models');
var rest = require('../models/Restaurants')
var axios = require('axios');
// var zomato = require('./../public/js/zomato');
const config = { headers: { 'user-key': 'bf0b007a082354a7c35efef48bf5a3c9' } };


const pageModel = {
	checkins: [],
	nearbyRest: [],
	totalWaiting: 0,
	party2Max: {
		count: 0,
		wait: 0
	},
	party3More: {
		count: 0,
		wait: 0
	},
	rest_image: 'https://b.zmtcdn.com/data/pictures/4/16764344/201b912aef2e888b7a0de6329031466f.jpg',
	rest_name: 'Dinosaur Bar-B-Que',
	rest_cuisines: 'BBQ, Southern',
	rest_address: '700 West 125th Street, New York, NY 10027',
	rest_lat: '40.8180821000',
	rest_long: '-73.9609373000'
};
var nearby_restaurants =[];
module.exports = function(app) {
	// Load index page
	app.get('/', function(req, res) {
		// zomato.getLocation();
		// console.log('The Good Stuff:', restArr);
		db.Restaurants.findAll({
		}).then(function(restaurant) {
		  console.log("Data for HTML Route:",restaurant);
		  nearby_restaurants.push(restaurant)
		});
		
		db.checkins
			.findAll({
				where: {
					REST_ID: '11'
				},
				raw: true
			})
			.then(function(dbResult) {

				


			

				// Reset var to 0
				pageModel.totalWaiting = 0;

				for (var i = 0; i < dbResult.length; i++) {
					if (dbResult[i].PARTY_SIZE <= 2) {
						pageModel.party2Max.wait += parseInt(dbResult[i].CURRENT_WAIT);
						pageModel.party2Max.count++;
						pageModel.party2Max.avgWait = Math.round(pageModel.party2Max.wait / pageModel.party2Max.count);
						pageModel.totalWaiting++;
					} else {
						pageModel.party3More.wait += parseInt(dbResult[i].CURRENT_WAIT);
						pageModel.party3More.count++;
						pageModel.party3More.avgWait = Math.round(
							pageModel.party3More.wait / pageModel.party3More.count
						);
						pageModel.totalWaiting++;
					}
				}

				pageModel.checkins = dbResult;

				console.log(pageModel);
				res.render('index', {pageModel});
			});

			
	});

	app.post('/zomato', function(req, res) {
		var lat = req.body.lat;
		var lng = req.body.lng;
		axios
			.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`, config)
			.then(function(response) {
				pageModel.nearbyRest = response.data.nearby_restaurants;
				res.redirect('/');
			});
	});

	// Load example page and pass in an example by id
	// app.get("/example/:id", function(req, res) {
	//   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
	//     res.render("example", {
	//       example: dbExample
	//     });
	//   });
	// });

	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404');
	});
};
