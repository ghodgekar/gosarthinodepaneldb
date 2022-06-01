const controller = require("../controllers/ride.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/rideSave",controller.rideSave);
  app.post("/api/assignDriver",controller.assignDriver);
  app.get("/api/ride/:status/:company_name", controller.rideList);
  app.get("/api/rideSingleDetails/:ride_id", controller.rideSingleDetails);
  app.post("/api/rideStatusUpdate/",controller.rideStatusUpdate);
  app.get("/api/rideOngoingList/:company_name", controller.rideOngoingList);
};