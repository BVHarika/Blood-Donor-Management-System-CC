var express = require("express"),
  mongoose = require("mongoose"),
  //   passport = require("passport"),
  bodyParser = require("body-parser"),
  //   LocalStrategy = require("passport-local"),
  //   passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/User");
BloodRequest = require("./models/BloodRequest");
Bank = require("./models/Bank");
const { validate } = require("./models/User");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1/bbm");

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.post("/register", function (req, res) {
  //   var email = req.body.email;
  //   var password = req.body.password;
  //   var fullname = req.body.fullname;
  //   var address = req.body.address;
  //   var zipcode = req.body.zipcode;

  var new_user = new User({
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    fullname: req.body.fullname,
    address: req.body.address,
    zipcode: req.body.zipcode,
    bgroup: req.body.bgroup,
  });
  console.log(req.body.email);
  if (validateUser(req.body.email) == false) {
    res.status(400);
    res.send("User already exists");
    return;
  } else {
    new_user.save(function (err, user) {
      if (err) {
        res.status(400);
        res.send(err);
        return;
      }
      res.status(200);
      res.send(user);
      return;
    });
  }
});

app.post("/login", function (req, res) {
  console.log(req.body.email);
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).exec((err, user) => {
    if (err) {
      res.status(500);
      res.send(err);
      return;
    } else if (user) {
      res.status(200);
      res.send(user);
      return;
    } else {
      res.status(400);
      res.send("User not found");
      return;
    }
  });
});

app.post("/req", function (req, res) {
  var new_req = new BloodRequest({
    email: req.body.email,
    phone: req.body.phone,
    fullname: req.body.fullname,
    zipcode: req.body.zipcode,
    bgroup: req.body.bgroup,
  });
  new_req.save(function (err, user) {
    if (err) {
      res.status(400);
      res.send(err);
      return;
    }
    User.find({
      zipcode: req.body.zipcode,
      bgroup: req.body.bgroup,
    }).exec((err, users) => {
      if (err) {
        res.status(400);
        res.send(err);
        return;
      } else if (users) {
        Bank.find({
          zipcode: req.body.zipcode,
        }).exec((err, banks) => {
          if (err) {
            res.status(400);
            res.send(err);
            return;
          } else if (banks) {
            res.status(200);
            resp = { users: users, banks: banks };
            res.send(resp);
            return;
          }
        });
      }
    });
  });
});

function validateUser(email) {
  User.findOne({
    email: email,
  }).exec((err, user) => {
    if (err) {
      return false;
    }
    if (user) {
      return false;
    } else {
      return true;
    }
  });
}

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
