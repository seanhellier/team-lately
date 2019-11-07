// 16781992
// 16784984

// alert("it's connected");
console.log("it's connected");

var x = document.getElementById('demo');

const config = { headers: { 'user-key': 'bf0b007a082354a7c35efef48bf5a3c9' } };

function zomatoAPICall(lat, lng) {
	axios.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`, config)
	.then((response) => {
		console.log(response);

		var restArr = [];

		var restaurantList = response.data.nearby_restaurants;

		for (var i = 0; i < restaurantList.length; i++) {
			restArr.push(restaurantList[i]);
		}

		console.log(restArr);
		var rest_id = '16784984';
    
    
		ajax.post('/api/zamatoresults/',{
			restArr: restArr
		})


		axios.get('/api/examples/' + rest_id).then((res) => {
			// console.log(res);
		});
	});
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = 'Geolocation is not supported by this browser.';
	}
}

function showPosition(position) {
	x.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
	var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};
	console.log("for zomato")
	zomatoAPICall(pos.lat, pos.lng);
}
