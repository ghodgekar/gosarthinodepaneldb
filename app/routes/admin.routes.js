const { verifyAdmin } = require("../middlewares");
const controller = require("../controllers/admin.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/admin/signup",
    [
      verifyAdmin.checkDuplicateUsernameOrEmail,
      verifyAdmin.checkDuplicatePhoneAndEmail
    ],
    controller.signup
  );
  app.post("/api/admin/signin", controller.signin);
  app.get("/api/admin/list", controller.adminList);
};