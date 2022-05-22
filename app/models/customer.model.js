const mongoose = require("mongoose");
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    user_id: {type:String},
    name: String,
    phone: Number,
    email: String,
    gender: String,
    country: String,
    state: String,
    city: String,
    pincode: Number,
    address: String,
    created_on: {type:Date, default: Date.now()},
    updated_on: {type:Date, default: Date.now()},
    is_active: {type:Number, default: 1},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = Customer;