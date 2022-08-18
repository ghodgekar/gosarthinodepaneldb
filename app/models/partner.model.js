const mongoose = require("mongoose");
const Partner = mongoose.model(
  "Partner",
  new mongoose.Schema({
    partner_id: String,
    partner_type: String,
    company_name: String,
    company_no: String,
    gst_no: String,
    phone: Number,
    email: String,
    country: String,
    state: String,
    city: String,
    pincode: Number,
    address: String,
    username: String,
    password: String,
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
module.exports = Partner;