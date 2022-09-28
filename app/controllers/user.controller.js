const config = require("../config/auth.config");
const db = require("../models");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = db.user;

function validateuserForm(payload) {
  let errors = {};
  let isFormValid = true;
  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide username.';
  }
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide password.';
  }
  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide Email.';
  }
  if (!payload || typeof payload.mobile !== 'string' || payload.mobile.trim().length === 0) {
    isFormValid = false;
    errors.mobile = 'Please provide Mobile No.';
  }
  if (!payload || typeof payload.role !== 'string' || payload.role.trim().length === 0) {
    isFormValid = false;
    errors.role = 'Please provide Role';
  }
  return {
      success: isFormValid,
      errors
  };
}

exports.userSave = (req, res) => {
  let userData = req.body;
  let validationResult = validateuserForm(userData);
  if (!validationResult.success) {
    return res.status(400).json({
      message: 'Form validation failed!',
      errors: validationResult.errors
    });
  }
  const user = new User({
    username: userData.username,
    email: userData.email,
    mobile: userData.mobile,
    role: userData.role,
    password: bcrypt.hashSync(userData.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "user Saved Successfully"});
    return;
  });
};

exports.userLogin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        accessToken: token
      });
    });
};