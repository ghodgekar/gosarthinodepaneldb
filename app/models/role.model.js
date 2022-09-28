const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
    prefix: Number
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = Role;