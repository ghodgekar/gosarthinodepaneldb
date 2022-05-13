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
  app.get("/api/ride", controller.rideList);
};