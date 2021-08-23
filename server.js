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
  return fs.readdirSync(__dirname + `/views/library/${filee}`).length - 1;
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
  res.render("index", {
    url: req.url
  });
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

  // if (req.params.im > fc(req.params.am) || req.params.im < 0) {
  // res.render('component/404')
  // } else
  const page = req.params.im || 1
  const perPage = 3

  res.render(`blog`, {
    url: req.url,
    post: file().content,
    title: file().data.title,
    description: file().data.description,
    author: file().data.author,
    date: file().data.date,
    current: page,
    pages: fc(req.params.am),
    blog: req.params.am
  });
});

app.get("/library/search", async (req, res) => {
  let end = " ";
  const folders = fs.readdirSync(__dirname + `/views/library`, { withFileTypes: true }).filter(file => file.isDirectory()).map(dirent => dirent.name)
  let outp;
  for (const folder of folders) {
    let fol = fs.readdirSync(__dirname + `/views/library/${folder}`).filter(x => x.name.includes("a")).map(x => x.name);
    fol.forEach(name => {
      const mat = matter.read(__dirname + `/views/library/${folder}/${name}` + '.md')
      end += `<article class='hentry'>
      <div class='postThumbnail'>
      <a href='https://fyy.my.id/2021/04/yumemiru-danshi-wa-genjitsushugisha-v2_28.html'>
      <img alt='${mat.data.title}' class='imgThumb lazy' data-src='https://lh3.googleusercontent.com/-W9g_l9jZaIU/YIh60-uhhtI/AAAAAAAACFw/VRvDEssvHJ4Q7voJLWwRN1ScPatzL3vzwCLcBGAsYHQ/w600-h300-p-k-no-nu/1619557043943043-0.png' src='data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='/>
      </a>
      </div>
      <div class='postContent'>
      <div class='postHeader'>
      <div class='postLabel' data-text='in'>
      <a aria-label='${mat.data.title}' data-text='${mat.data.title}' href='https://fyy.my.id/search/label/Yumemiru%20Danshi%20wa%20Genjitsushugisha' rel='tag'>
      </a>
      </div>
      </div>
      <h2 class='postTitle'>
      <a href='https://fyy.my.id/2021/04/yumemiru-danshi-wa-genjitsushugisha-v2_28.html' rel='bookmark'>
      ${mat.data.title}
      </a>
      </h2>
      <div class='postInfo'>
      <time class='postTimestamp updated' data-text='By Jeffry &#8212; Mei 22, 2021'></time>
      </div>
      </div>
      </article>`
    })
  };
  res.render(`search`, {
    content: end,
    page: req.params.im
  });
})
app.get("/library/:im", async (req, res) => {
  function file() {
    return matter.read(__dirname + `/views/library/${req.params.im}/0` + '.md');
  };
  res.render(`blog-parent`, {
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





  //.     Jangan tambahin code dibawah sini ._.
  res.render("library", {
    blog: function(input) {
      let abc = ress.filter(x => x.toLowerCase().startsWith(input));
      let result = " ";
      if (abc.length > 0) {
        for (b of abc) {

          result += `<div class='win-item'><div class='win-title'><a title='Because I Like You' class="link-info" href='https://fyy.my.id/library/${b}'>${upLet(b.replace(/-/gi,' '))}</a></div></div>`
        }
      }; //`
      return result;

      function upLet(words) {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
          separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
            separateWord[i].substring(1);
        }
        return separateWord.join(' ');
      };
    }
    //`
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
app.get("/p/:year/:month/:id", async (req, res) => {
  res.render(`post/${req.params.year}/${req.params.month}/${req.params.id}`) || res.render("component/404");
});
/*
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
});*/
app.listen(process.env.PORT);