// 16781992
// 16784984

// alert("it's connected");

var x = document.getElementById('demo');

const config = { headers: { 'user-key': 'bf0b007a082354a7c35efef48bf5a3c9' } };
//helper function
function zomatoAPICall(lat, lng) {
	axios.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`, config).then((response) => {
		// console.log(response);
		var restArr = [];
		var restaurantList = response.data.nearby_restaurants;

		for (var i = 0; i < restaurantList.length; i++) {
			restArr.push({
				rest_id: restaurantList[i].restaurant.id,
				rest_name: restaurantList[i].restaurant.name,
				rest_cuisines: restaurantList[i].restaurant.cuisines,
				rest_lat: restaurantList[i].restaurant.location.latitude,
				rest_long: restaurantList[i].restaurant.location.longitude,
				rest_address: restaurantList[i].restaurant.location.address,
				rest_image: restaurantList[i].restaurant.featured_image
			});
		}
		// console.log('The Good Stuff:', restArr);
		axios.post('/api/restData', restArr).then((res) => {
			// console.log(res);
		});
	});
}
//called when btn clicked
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = 'Geolocation is not supported by this browser.';
		console.log('getLocation error');
	}
}

//helper function
function showPosition(position) {
	x.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
	var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};
	console.log('for zomato');
	zomatoAPICall(pos.lat, pos.lng);
}
// module.exports = {
// 	getLocation: getLocation
// };
