// const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get("/api/all", controller.allAccess);
  app.post("/api/add/user",[verifySignUp.checkDuplicateUsernameOrEmail], controller.userSave);
  app.post("/api/signin/user", controller.userLogin);
  // app.get(
  //   "/api/user",
  //   [authJwt.verifyToken, authJwt.isUser],
  //   controller.userBoard
  // );
  // app.get(
  //   "/api/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};