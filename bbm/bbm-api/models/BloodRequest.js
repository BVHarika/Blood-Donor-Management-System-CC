var mongoose = require("mongoose");

var ReqSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    fullname: String,
    address: String,
    zipcode: Number,
    bgroup: String,
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("BllodRequest", ReqSchema);
