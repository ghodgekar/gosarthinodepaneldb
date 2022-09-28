const mongoose = require("mongoose");
const RideAccidentImgVideo = mongoose.model(
  "RideAccidentImgVideo",
  new mongoose.Schema({
    ride_id: String,
    path: String,
    file_type: String,
    ride_accidental_comment: {type:String, default:null},
    is_active: {type:Number, default: 1},
    created_on: {type:Date, default: Date.now()},
    updated_on: {type:Date, default: Date.now()},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = RideAccidentImgVideo;