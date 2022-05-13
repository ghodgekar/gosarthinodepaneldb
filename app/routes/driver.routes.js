const { verifyDriver } = require("../middlewares");
const controller = require("../controllers/driver.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/driverSave",
    [verifyDriver.checkDuplicatePhoneAndEmail],
    controller.driverSave
  );
  app.post("/api/driverUpdate", controller.driverUpdate);
  app.get("/api/driver/:status", controller.driverList);
  app.get("/api/singleDriver/:driver_id", controller.singleDriver);
  app.post("/api/driverDocSave", controller.driverDocSave);
  app.get("/api/driverDoc/:driver_id", controller.driverDocList);
  app.get('/api/driverDocImg', controller.driverDocImage);
  app.post('/api/driverStatusUpdate', controller.driverStatusUpdate);
  app.post('/api/driverApproveReject', controller.driverApproveReject);
  app.post('/api/driverHistorySave', controller.driverHistorySave);
  app.get("/api/driverHistory/:driver_id", controller.driverHistoryList);
};