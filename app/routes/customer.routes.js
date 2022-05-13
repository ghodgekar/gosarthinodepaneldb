const { verifyCustomer } = require("../middlewares");
const controller = require("../controllers/customer.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/customerSave",
    [verifyCustomer.checkDuplicatePhoneAndEmail],
    controller.customerSave
  );
  app.post("/api/customerUpdate", controller.customerUpdate);
  app.get("/api/customer", controller.customerList);
  app.get("/api/customerByPhone/:phone", controller.customerByPhone);
};