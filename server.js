const http = require("http"),
      express = require("express"),
      app = express(),
      path = require("path"),
      config = require("./config.json");

/*app.set("views", path.join(__dirname, "/views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');*/
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static("public"));
app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/public'));

//Routing
if(config.maintenance.status === true){
  app.use(function(req, res) {
    res.render("maintenance")
  });
}else {
  
app.get("/", function(req, res) {
  res.render("index");
});

//post Route

app.get("/post/2021/:id", async (req, res) => {
  res.render(`post/2021/2/${req.params.id}`) ||
    res.render("404");
});
app.get("/novel/because-i-like-you/:im", async (req, res) => {
  res.render(`post/novel/because-i-like-you/${req.params.im}`) || res.render("404");
});

app.get("/post/:year/:month/:id", async (req, res) => {
  res.render(`post/${req.params.year}/${req.params.month}/${req.params.id}`) || res.render("404");
});

//Handle Blank section

app.get("/maintenance", async (req,res) =>{
  res.render("maintenance")
})
app.get("/test", async (req,res) =>{
  res.render("test")
})
app.use(function(req, res) {
  res.render("404")
});

}
app.listen(process.env.PORT);