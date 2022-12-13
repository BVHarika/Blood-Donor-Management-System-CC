var mongoose = require("mongoose");

var BankSchema = new mongoose.Schema(
  {
    name: String,
    zipcode: Number,
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("Bank", BankSchema);
