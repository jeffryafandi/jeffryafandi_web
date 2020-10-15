const http = require("http");
const ejs = require('ejs')
const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
var mt = true
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
if (mt === true){
  app.get("*", function(req, res) {
    res.render("index.ejs")
  })
}else
app.get("/", function(req, res) {
  res.render("index.ejs")
})
app.get("/lisensi", function(req, res) {
  //Tugas Maping
  res.render("lisensi.ejs")
})



app.get("/tugas/4", function(req, res) {
  res.render("tugas/4.ejs")
})
app.get("/tugas/3", function(req, res) {
  res.render("tugas/3.ejs")
})
app.get("/tugas/2", function(req, res) {
  res.render("tugas/2.ejs")
})
app.get("/tugas/1", function(req, res) {
  res.render("tugas/1.ejs")
})

//404 err
app.get('*', function(req, res) {
  res.render("404")
  res.sendStatus(404)
});
app.listen(process.env.PORT)