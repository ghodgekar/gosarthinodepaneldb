const controller = require("../controllers/status.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/statusSave", controller.statusSave);
  app.post("/api/statusUpdate", controller.statusUpdate);
  app.get("/api/status", controller.statusList);
};