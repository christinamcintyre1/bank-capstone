const mongoose = require("mongoose");
const bodyParser = require("body-parser");

var path = require("path");
var express = require("express");
var app = express();
let cors = require("cors");
let dal = require("././dal.js");
const e = require("express");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const uri =
  "mongodb+srv://admin:admin@badbankstandalone2.2u8el.mongodb.net/test";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.post("/account/login", (req, res) => {
  //req.body; // JavaScript object containing the parse JSON
  //res.json(req.body);
  dal.findOne(req.body.email).then((user) => {
    if (user !== null) {
      console.log(user);
      console.log("User already exists");
      if (user.password === req.body.password) {
        console.log("Password matches");
        res.json({
          name: user.name,
          email: user.email,
          authenticated: true,
        });
      }
    } else {
      console.log("User does not exist");
      res.json({
        authenticated: false,
      });
    }
  });
});

app.post("/account/create", (req, res) => {
  req.body; // JavaScript object containing the parse JSON
  //res.json(req.body);
  dal.findOne(req.body.email).then((users) => {
    if (users !== null) {
      console.log(users);
      console.log("User already exists");
      res.send("Email already exists");
    } else {
      dal
        .create(req.body.name, req.body.email, req.body.password)
        .then((user) => {
          console.log(user);
          res.send(user);
        });
    }
  });
});

app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send("Login failed : wrong password");
      }
    } else {
      res.send("Login failed : user does not exist");
    }
  });
});

app.get("/account/find/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

app.get("/account/update/:email/:amount", function (req, res) {
  let amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port " + ${PORT}`);
});
