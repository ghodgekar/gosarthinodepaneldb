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
        // verifyPartner.checkDuplicatePhoneAndEmail,
        // verifyPartner.checkDuplicateGST,
        verifyPartner.checkDuplicateUsername,
        verifyPartner.checkCompanyName,
        verifyPartner.checkCompanyNo
    ],
    controller.partnerSave
  );
  app.post("/api/partnerUpdate", controller.partnerUpdate);
  app.get("/api/partner/:status", controller.partnerList);
  app.get("/api/partnerByPhone/:phone", controller.partnerByPhone);
  app.post("/api/partnerLogin", controller.partnerLogin);
  app.get("/api/singlePartner/:partner_id", controller.singlePartner);
  app.post('/api/partnerStatusUpdate', controller.partnerStatusUpdate);
  app.post('/api/partnerApproveReject', controller.partnerApproveReject);
  app.post('/api/partnerHistorySave', controller.partnerHistorySave);
  app.get("/api/partnerHistory/:partner_id", controller.partnerHistoryList);
  app.post("/api/partnerDocSave", controller.partnerDocSave);
  app.get("/api/partnerDoc/:partner_id", controller.partnerDocList);
  app.get('/api/partnerDocImg', controller.partnerDocImage);
};