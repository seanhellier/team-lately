var db = require('../models');
var axios = require('axios');
// var zomato = require('./../public/js/zomato');
const config = {
	headers: {
		'user-key': 'bf0b007a082354a7c35efef48bf5a3c9'
	}
};

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
	rest_id: 0,
	rest_image: 'https://b.zmtcdn.com/data/pictures/4/16764344/201b912aef2e888b7a0de6329031466f.jpg',
	REST_NAME: 'Dinosaur Bar-B-Que',
	rest_cuisines: 'BBQ, Southern',
	rest_address: '700 West 125th Street, New York, NY 10027',
	rest_lat: '40.8180821000',
	rest_long: '-73.9609373000'
};

module.exports = function (app) {

	//USE THIS TO CLICK SEARCH AND POPULATE YOUR DB
	// if you dont have a matching REST_ID in your db to query
	app.get('/', async function (req, res) {
		const restData = await db.Restaurants.findAll({
			include: [db.checkins]
		})
		res.render('index', {
			restData: restData
		});
	});

	// Load index page
	// app.get('/', async function (req, res) {
	// example restaurant
	// 		# REST_ID, REST_NAME, REST_CUISINES, REST_LAT, REST_LONG, REST_ADDRESS, REST_IMAGE, createdAt, updatedAt
	// 		'16785398', 'Shake Shack', 'American, Burger', '40.7587361', '-73.9890139', '691 8th Avenue, New York 10036', 'https://b.zmtcdn.com/data/res_imagery/16785398_RESTAURANT_9808b948d2739435ea95bd3002d95cda.jpg?output-format=webp', '2019-11-17 06:11:43', '2019-11-17 06:11:43'

	// exmaple client
	// 		'2', 'fwefa@gmail.com', '123', '123', '1', '2019-11-17 06:12:16', '2019-11-17 06:12:16', '16785398'
	// 	const dbRest = await db.Restaurants.findAll({
	// 		where: {REST_ID: '16785398'},
	// 		include: [db.checkins]
	// 	})
	// 	res.json(dbRest)
	// })



	app.post('/zomato', function (req, res) {
		var lat = req.body.lat;
		var lng = req.body.lng;
		axios
			.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`, config)
			.then(function (response) {
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
	app.get('*', function (req, res) {
		res.render('404');
	});
};