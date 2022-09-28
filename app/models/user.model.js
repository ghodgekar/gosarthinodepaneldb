const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    mobile: Number,
    password: String,
    role: String
  },{
    versionKey: false
  })
);
module.exports = User;