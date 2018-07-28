// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================

let views = 0;

var tables = [{
  customerName: "Shane",
  phoneNumber: "480-867-5309",
  customerEmail: "shane@awesome.com",
  customerID: "888890"
}];
var waitListArray = [{
  customerName: "Goku",
  phoneNumber: "480-867-5309",
  customerEmail: "goku@awesome.com",
  customerID: "826890"
},
{
  customerName: "sinrone",
  phoneNumber: "480-867-5309",
  customerEmail: "sinrone@awesome.com",
  customerID: "887890"
}];
// Routes
// =============================================================


// Basic route that sends the user first to the AJAX Page

app.get("/api/views", function(req, res) {
  res.send({views: views});
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
  views++;
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
  views++;
});

// Displays all characters
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
  views++;
});

app.post("/api/tables", function(req, res) {

  if (tables.length > 5) {
    waitListArray.push(req.body); 
  } 
  else {
    tables.push(req.body);
  }
});

app.get("/api/tables", function(req,res) {

  res.json(tables);
});

app.get("/api/waitlist/", function (req, res){
  res.json(waitListArray);
});

app.post("/api/clear/", function (req, res){
  tables = []
  waitListArray = []
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
