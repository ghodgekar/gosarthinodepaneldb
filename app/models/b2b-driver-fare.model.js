const mongoose = require("mongoose");
const B2BDriverFare = mongoose.model(
  "B2BDriverFare",
  new mongoose.Schema({
    id: String,
    car_type: {type:String},
    transmission: {type:String},
    is_fuel: {type:Number},
    from: {type:Number},
    to: {type:Number},
    rs: {type:Number},
    exrtra_rs: {type:Number}
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = B2BDriverFare;