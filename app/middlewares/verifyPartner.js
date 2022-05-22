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
  checkDuplicateUsername
};
module.exports = verifyPartner;