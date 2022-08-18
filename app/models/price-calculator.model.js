const mongoose = require("mongoose");
const PriceCalculator = mongoose.model(
  "PriceCalculator",
  new mongoose.Schema({
    id: String,
    dis_id: {type:Number},
    range_from: {type:Number},
    range_to: {type:Number},
    rs: {type:Number},
    per_km_rs: {type:Number},
    is_active: {type:Number, default: 1}
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = PriceCalculator;