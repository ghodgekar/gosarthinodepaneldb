const mongoose = require("mongoose");
const Partner = mongoose.model(
  "Partner",
  new mongoose.Schema({
    partner_id: String,
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
    created_on: {type:Date, default: Date.now()},
    updated_on: {type:Date, default: Date.now()},
    is_active: {type:Number, default: 1},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = Partner;