// const mongoose = require("mongoose");

// const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
//     email: String,
//     password: String,
//     fullname: String,
//     address: String,
//     zipcode: Number,
//   })
// );
// module.exports = User;

var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    phone: String,
    fullname: String,
    address: String,
    zipcode: Number,
    bgroup: String,
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
