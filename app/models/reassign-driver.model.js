const mongoose = require("mongoose");
const ReassignDriver = mongoose.model(
  "ReassignDriver",
  new mongoose.Schema({
    ride_id: {type:String, default:null},
    driver_id: {type:String, default:null},
    driver_name: {type:String, default:null},
    city: {type:String, default:null},
    time: {type:String, default:null},
    exist_parking_no: {type:String, default:null},
    is_active: {type:Number, default: 1},
    created_on: {type:Date, default: Date.now()},
    updated_on: {type:Date, default: Date.now()},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = ReassignDriver;