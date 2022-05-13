const mongoose = require("mongoose");
const Country = mongoose.model(
  "Country",
  new mongoose.Schema({
    name: String,
    is_home: {type:Number, default: 0},
    is_active: {type:Number, default: 1}
  },{
    versionKey: false
  })
);
module.exports = Country;