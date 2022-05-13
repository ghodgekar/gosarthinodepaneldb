const mongoose = require("mongoose");
const State = mongoose.model(
  "State",
  new mongoose.Schema({
    name: String,
    country_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country"
    },
    is_active: {type:Number, default: 1},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = State;