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
/* [ Maintenance Management ] */
/*
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
  let end = [];

  const folders = fs.readdirSync(__dirname + `/views/library`, { withFileTypes: true }).filter(file => file.isDirectory()).map(dirent => dirent.name)
  let outp;
  folders.forEach(folder => {
    let fol = fs.readdirSync(__dirname + `/views/library/${folder}`).filter(x => x !== "0.md")
    fol.forEach(name => {
      const mat = matter.read(__dirname + `/views/library/${folder}/${name}`)
      end.push({ "file": { "title": mat.data.title, "description": mat.data.description, "author": mat.data.author, "date": mat.data.date, "image": mat.data.image }, "url": "https://fyy.my.id/library/" + folder + "/" + name.slice(0, -3),"keyword": (mat.data.title).toLowerCase() })
    })
  });
  let end_s = end.filter(x=> (x.file.keyword).includes("because")).map(x => x.file);
  let content = " ";
  for (const ends of end_s) {
    content += `<article class='hentry'>
      <div class='postThumbnail'>
      <a href='${ends.url}'>
      <img alt='${ends.title}' class='imgThumb lazy' data-src='${ends.image}' src='data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='/>
      </a>
      </div>
      <div class='postContent'>
      <div class='postHeader'>
      <div class='postLabel' data-text='in'>
      <a aria-label='${ends.title}' data-text='${ends.title}' href='${ends.url}' rel='tag'>
      </a>
      </div>
      </div>
      <h2 class='postTitle'>
      <a href='${ends.url}' rel='bookmark'>
      ${ends.title}
      </a>
      </h2>
      <div class='postInfo'>
      <time class='postTimestamp updated' data-text='By ${ends.author} &#8212; ${ends.date}'></time>
      </div>
      </div>
      </article>`
  }
  res.render(`search`, {
    content: content,
    title: end_s.title,
    author: end_s.author,
    description: end_s.description,
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