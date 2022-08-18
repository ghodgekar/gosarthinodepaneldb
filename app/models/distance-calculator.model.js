const mongoose = require("mongoose");
const DistanvceCalculator = mongoose.model(
  "DistanvceCalculator",
  new mongoose.Schema({
    id: String,
    car_type: {type:String},
    transmission: {type:String},
    is_fuel: {type:Number},
    is_active: {type:Number, default: 1}
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = DistanvceCalculator;