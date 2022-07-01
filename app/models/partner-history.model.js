const mongoose = require("mongoose");
const PartnerHistory = mongoose.model(
  "PartnerHistory",
  new mongoose.Schema({
    partner_id: String,
    action: String,
    reason: String,
    remark: String,
    created_on: {type:Date, default: Date.now()}
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = PartnerHistory;