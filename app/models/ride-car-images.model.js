const mongoose = require("mongoose");
const RideCarImages = mongoose.model(
  "RideCarImages",
  new mongoose.Schema({
    ride_id: String,
    img_path: String,
    img_type: String,
    is_active: {type:Number, default: 1},
    created_on: {type:Date, default: Date.now()},
    updated_on: {type:Date, default: Date.now()},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = RideCarImages;