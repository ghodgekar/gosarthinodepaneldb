const { verifyPartner } = require("../middlewares");
const controller = require("../controllers/partner.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/partnerSave",
    [   
        verifyPartner.checkDuplicatePhoneAndEmail,
        verifyPartner.checkDuplicateGST,
        verifyPartner.checkDuplicateUsername
    ],
    controller.partnerSave
  );
  app.post("/api/partnerUpdate", controller.partnerUpdate);
  app.get("/api/partner", controller.partnerList);
  app.get("/api/partnerByPhone/:phone", controller.partnerByPhone);
  app.post("/api/partnerLogin", controller.partnerLogin);
};