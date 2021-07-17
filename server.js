const http = require("http"),
  express = require("express"),
  app = express(),
  path = require("path"),
  config = require("./config.json"),
  fs = require('fs');
//Length file
let because_i_like_you = fs.readdirSync('./views/library/because-i-like-you').length -1;

//variable
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static("public"));
app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/public'));

//Routing

app.get("/", function(req, res) {
  res.render("index");
});

//post Route
app.get("/library", async (req, res) => {
  res.render(`library`);
});

app.get("/library/because-i-like-you-bab-:im", async (req, res) => {
   if (req.params.im > because_i_like_you) {
    res.render('404');
  }
  else
    res.render(`library/because-i-like-you/${req.params.im}`);
});

app.get("/ad1", async (req, res) => {
  res.render("test")
})
app.get("/ad2", async (req, res) => {
  res.render("test1")
})
app.get("/ad3", async (req, res) => {
  res.render("test2")
})
app.get("/library/:im", async (req, res) => {
    res.render(`library/${req.params.im}/001`);
});

app.get("/p/:year/:month/:id", async (req, res) => {
  res.render(`post/${req.params.year}/${req.params.month}/${req.params.id}`) || res.render("404");
});

//Handle Blank section

app.get("/maintenance", async (req, res) => {
  res.render("maintenance")
})

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
});


app.listen(process.env.PORT);