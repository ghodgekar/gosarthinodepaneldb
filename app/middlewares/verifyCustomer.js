const db = require("../models");
const Customer = db.customer;
checkDuplicatePhoneAndEmail = (req, res, next) => {
  // phone
  Customer.findOne({
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
    Customer.findOne({
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
const verifyCustomer = {
  checkDuplicatePhoneAndEmail
};
module.exports = verifyCustomer;