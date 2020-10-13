const http = require("http");
const ejs = require('ejs')
const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "/web"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/public'));
// Website Maping__________________________
app.get("/p200ok", function(req, res) {
  res.sendStatus(200);
  console.log("Nah kan Kena Ping...")
});
app.get("/tugas/b-indo-88-89", function(req, res) {
  res.render("tugas/001.ejs")
})
app.get("/tugas/bi-23-9", function(req, res) {
  res.render("tugas/002.ejs")
})
app.get("/", function(req, res) {
  res.render("index.ejs")
})
app.get("/lisensi", function(req, res) {
  res.render("lisensi.ejs")
})
app.listen(process.env.PORT)