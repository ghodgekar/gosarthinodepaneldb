const db = require("../models");
const Admin = db.admin;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Admin.findOne({
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
    // Email
    Admin.findOne({
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
checkDuplicatePhoneAndEmail = (req, res, next) => {
    // phone
    Admin.findOne({
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
      Admin.findOne({
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
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkDuplicatePhoneAndEmail
};
module.exports = verifySignUp;