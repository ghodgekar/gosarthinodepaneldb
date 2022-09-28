const config = require("../config/auth.config");
const db = require("../models");
const Admin = db.admin;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  const admin = new Admin({
    full_name: req.body.full_name,
    username: req.body.username,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    role: 'admin',
    is_admin_menu: 1
  });
  admin.save((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    return res.status(200).send({ message: "Admin Data Save Successfully." });
  });
};
exports.signin = (req, res) => {
  Admin.findOne({
    username: req.body.username
  })
  .exec((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!admin) {
      return res.status(404).send({ message: "User Not found." });
    }
    if (req.body.password != admin.password) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    res.status(200).send({ data:admin, role: "admin", message: "Login Successfull" });
  });
};

exports.adminList = (req, res) => {
    Admin.find({is_active:1})
  .exec((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:admin, message: "" });
  });
};