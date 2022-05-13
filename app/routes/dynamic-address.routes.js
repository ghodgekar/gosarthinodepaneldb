const controller = require("../controllers/dynamic-address.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/countrySave", controller.countrySave);
  app.get("/api/country", controller.countryList);
  app.post("/api/stateSave", controller.stateSave);
  app.get("/api/state/:country_id", controller.stateList);
  app.post("/api/citySave", controller.citySave);
  app.get("/api/city/:state_id", controller.cityList);
};