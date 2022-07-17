const mongoose = require("mongoose");
const CarModel = mongoose.model(
  "CarModel",
  new mongoose.Schema({
    Model: String,
    Category: String
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = CarModel;