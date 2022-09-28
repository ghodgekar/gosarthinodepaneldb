const mongoose = require("mongoose");
const Menu = mongoose.model(
  "Menu",
  new mongoose.Schema({
    id: Number,
    menu_name: {type:String},
    menu_route: {type:String},
    is_parent: {type:Number},
    menu_order: {type:Number},
    is_active: {type:Number, default:1}
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = Menu;