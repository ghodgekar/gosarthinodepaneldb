const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyCustomer = require("./verifyCustomer");
const verifyDriver = require("./verifyDriver");
const verifyPartner = require("./verifyPartner");
module.exports = {
  authJwt,
  verifySignUp,
  verifyCustomer,
  verifyDriver,
  verifyPartner
};