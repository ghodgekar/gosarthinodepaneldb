const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyCustomer = require("./verifyCustomer");
const verifyDriver = require("./verifyDriver");
module.exports = {
  authJwt,
  verifySignUp,
  verifyCustomer,
  verifyDriver
};