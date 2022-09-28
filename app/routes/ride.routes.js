const controller = require("../controllers/ride.controller");
const b2cFarecontroller = require("../controllers/b2c-trailer-fare.controller");
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
  app.get("/api/rideByPartner/:partner_id", controller.rideListByPartner);
  app.get("/api/rideByDriver/:driver_id", controller.rideListByDriver);
  app.post("/api/uploadRideCarImg",controller.rideCarImageSave);
  app.get("/api/rideCarImgList/:ride_id/:img_type", controller.rideCarList);
  app.get('/api/rideCarImg', controller.rideCarImage);
  app.post("/api/rideReassignDataSave",controller.rideReassignDataSave);
  app.get("/api/rideReassignDataList/:ride_id/:exist_parking_no", controller.rideReassignDataList);
  app.post("/api/b2cTrailerFare",b2cFarecontroller.calculate);
  app.post("/api/b2bFinalCalculationDriver",b2cFarecontroller.b2bFinalDriverCalculation);

  
  app.post("/api/uploadRideAccidentImgVideo",controller.rideAccidentImgVideoSave);
  app.get("/api/rideAccidentImgVideoList/:ride_id/:file_type", controller.rideAccidentImgList);
  app.post("/api/updateRideAddress",controller.updateRideAddress);
};