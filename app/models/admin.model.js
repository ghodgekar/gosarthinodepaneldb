const mongoose = require("mongoose");
const Admin = mongoose.model(
  "Admin",
  new mongoose.Schema({
    id: String,
    full_name: {type:String},
    email: {type:String},
    phone: {type:Number},
    address: {type:String},
    username: {type:String},
    password: {type:String},
    is_active: {type:Number, default:1},
    role: {type:String},
    is_admin_menu: {type:Number, default:1},
    is_active: {type: Number, default:1}
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = Admin;