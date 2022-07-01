const mongoose = require("mongoose");
const Driver = mongoose.model(
  "Driver",
  new mongoose.Schema({
    driver_id: {type:String},
    name: String,
    phone: Number,
    alt_phone: Number,
    email: String,
    gender: String,
    dob: String,
    country: String,
    state: String,
    city: String,
    pincode: Number,
    address: String,
    device_type: String,
    vehicle_type: {type:String, default:null},
    bank_name: {type:String, default:null},
    acc_holder_name: {type:String, default:null},
    acc_no: {type:String, default:null},
    ifsc_code: {type:String, default:null},
    micr_code: {type:String, default:null},
    status: {type:Number, default: 1},
    reject_reason: {type:String, default:null},
    is_active: {type:Number, default: 1},
    created_on: {type:Date, default: Date.now()},
    updated_on: {type:Date, default: Date.now()},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = Driver;