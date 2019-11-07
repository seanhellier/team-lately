var db = require("../models");
var axios = require('axios');
const config = { headers: { 'user-key': 'bf0b007a082354a7c35efef48bf5a3c9' } }

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
  rest_image: "https://b.zmtcdn.com/data/res_imagery/17212050_RESTAURANT_f8adb2c46628653a0eddb1dfeb6d210a_c.jpg",
  rest_name: "Carlo's Bakery",
  rest_cuisines: "Desserts",
  rest_address: "95 Washington Street, Hoboken 07030",
  rest_lat: "40.7371700000",
  rest_long: "-74.0307850000",

}



module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.checkins.findAll({
      where: {
        REST_ID: "11"
      }, raw: true
    }).then(function (dbResult) {

      // Reset var to 0
      pageModel.totalWaiting = 0

      for (var i = 0; i < dbResult.length; i++) {
        if (dbResult[i].PARTY_SIZE <= 2) {
          pageModel.party2Max.wait += parseInt(dbResult[i].CURRENT_WAIT)
          pageModel.party2Max.count++
          pageModel.party2Max.avgWait = Math.round(pageModel.party2Max.wait / pageModel.party2Max.count)
         pageModel.totalWaiting++
        }
        else {
          pageModel.party3More.wait += parseInt(dbResult[i].CURRENT_WAIT);
          pageModel.party3More.count++
          pageModel.party3More.avgWait = Math.round(pageModel.party3More.wait / pageModel.party3More.count)
          pageModel.totalWaiting++
        }
      }

      pageModel.checkins = dbResult

      console.log(pageModel)
      res.render("index", pageModel);
    });
    // console.log(dbExample)
  });

  app.post("/zomato", function(req, res){
    var lat = req.body.lat;
    var lng = req.body.lng;
    axios.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`, config)
      .then(function(response){

        pageModel.nearbyRest = response.data.nearby_restaurants;
        res.redirect("/")
      })
  })

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
