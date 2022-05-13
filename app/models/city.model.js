const mongoose = require("mongoose");
const City = mongoose.model(
  "City",
  new mongoose.Schema({
    name: String,
    state_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "State"
    },
    is_active: {type:Number, default: 1},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = City;