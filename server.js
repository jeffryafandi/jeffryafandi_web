const http = require("http"),
  express = require("express"),
  app = express(),
  path = require("path"),
  config = require("./config.json"),
  fs = require('fs'),
  matter = require('gray-matter');
var bodyParser = require("body-parser");

//filter filecount
function fc(filee) {
  return fs.readdirSync(__dirname + `/views/library/${filee}`).length - 2;
}

// app setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res) {
  res.render("index");
});
/*
//Maintenance Management
app.use(function(req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('component/maintenance', { exp: "Sep 30, 2021 00:00:00" });
    return;
  }
});*/

//Routing
app.get("/library/:am/:im", (req, res) => {

  function file() {
    return matter.read(__dirname + `/views/library/${req.params.am}/${req.params.im}` + '.md');
  };

  if (req.params.im > fc(req.params.am) || req.params.im < 0) {
    res.render('component/404')
  } else
    res.render(`blog`, {
      post: file().content,
      title: file().data.title,
      description: file().data.description,
      author: file().data.author,
      date: file().data.date,
      page: req.params.im
    });
});
app.get("/library", (req, res) => {
  const ress = fs.readdirSync(__dirname + '/views/library', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

  function fil(input) {
    return ress.filter(x => x.toLowerCase().startsWith(input))
  }
  res.render("library", {
    a: fil("a"),
    b: fil("b"),
    c: fil("c"),
    d: fil("d"),
    e: fil("e"),
    f: fil("f"),
    g: fil("g"),
    h: fil("h"),
    i: fil("i"),
    j: fil("j"),
    k: fil("k"),
    l: fil("l"),
    m: fil("m"),
    n: fil("n"),
    o: fil("o"),
    p: fil("p"),
    q: fil("q"),
    r: fil("r"),
    s: fil("s"),
    t: fil("t"),
    u: fil("u"),
    v: fil("v"),
    w: fil("w"),
    x: fil("x"),
    y: fil("y"),
    z: fil("a")
  });
});

//AD for Raznar
app.get("/ad1", async (req, res) => {
  res.render("component/test")
})
app.get("/ad2", async (req, res) => {
  res.render("component/test1")
})
app.get("/ad3", async (req, res) => {
  res.render("component/test2")
})
app.get("/library/:im", async (req, res) => {
  res.render(`library/${req.params.im}/0`);
});

app.get("/p/:year/:month/:id", async (req, res) => {
  res.render(`post/${req.params.year}/${req.params.month}/${req.params.id}`) || res.render("component/404");
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).render(`component/error`, {
    status: error.status || 500,
    message: error.message || 'Internal Server Error',
  });
});

app.listen(process.env.PORT);