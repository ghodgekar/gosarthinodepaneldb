const mongoose = require("mongoose");
const PartnerDocument = mongoose.model(
  "PartnerDocument",
  new mongoose.Schema({
    partner_id: String,
    document_name: String,
    document_no: String,
    document_path: String,
    is_active: {type:Number, default: 1},
    created_on: {type:Date, default: Date.now()},
    updated_on: {type:Date, default: Date.now()},
  },{
    versionKey: false
  })
);
module.exports = PartnerDocument;