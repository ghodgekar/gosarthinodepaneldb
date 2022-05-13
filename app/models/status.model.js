const mongoose = require("mongoose");
const Status = mongoose.model(
  "Status",
  new mongoose.Schema({
    id: Number,
    name: String,
    child: [
      {
        id: {
          type: Number
        },
        name: {
          type: String
        }
      }
    ],
    is_active: {type:Number, default: 1}
  },{
    versionKey: false
  })
);
module.exports = Status;