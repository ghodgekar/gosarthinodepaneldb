const db = require("../models");
const Partner = db.partner;
checkDuplicatePhoneAndEmail = (req, res, next) => {
  // phone
  Partner.findOne({
    phone: req.body.phone
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Phone is already in use!" });
      return;
    }
    // Email
    Partner.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};
checkCompanyName = (req, res, next) => {
    // phone
    Partner.findOne({
      company_name: req.body.company_name
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Company Name is already in use!" });
        return;
      }
    });
    next();
};
checkCompanyNo = (req, res, next) => {
    // phone
    Partner.findOne({
      company_no: req.body.company_no
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Company Number is already in use!" });
        return;
      }
    });
    next();
};
checkDuplicateGST = (req, res, next) => {
    // phone
    Partner.findOne({
        gst_no: req.body.gst_no
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! GST Number is already in use!" });
        return;
      }
    });
    next();
};
checkDuplicateUsername = (req, res, next) => {
    // phone
    Partner.findOne({
        username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
    });
    next();
};
const verifyPartner = {
  checkDuplicatePhoneAndEmail,
  checkDuplicateGST,
  checkCompanyName,
  checkCompanyNo,
  checkDuplicateUsername
};
module.exports = verifyPartner;