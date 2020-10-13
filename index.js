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
app.get("/", function(req, res) {
  res.render("index.ejs")
})
app.get('*', function(req, res) {
  res.send('Halaman tak dapat ditemukan, Kembali ke beranda : https://jeffryafandi.tk/', 404);
});
app.get("/lisensi", function(req, res) {
  //Tugas Maping
  res.render("lisensi.ejs")
})
app.get("/tugas/1", function(req, res) {
  res.render("tugas/1.ejs")
})
app.get("/tugas/2", function(req, res) {
  res.render("tugas/2.ejs")
})
app.get("/tugas/3", function(req, res) {
  res.render("tugas/3.ejs")
})
app.listen(process.env.PORT)