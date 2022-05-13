const db = require("../models");
const Driver = db.driver;
checkDuplicatePhoneAndEmail = (req, res, next) => {
  // phone
  Driver.findOne({
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
    Driver.findOne({
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
const verifyDriver = {
  checkDuplicatePhoneAndEmail
};
module.exports = verifyDriver;