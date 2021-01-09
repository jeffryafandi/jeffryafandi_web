const app = require("express")();
const { static: StaticExpress } = require("express");
const { readdirSync } = require("fs");

class ServerListener {
  constructor(_port, staticPath) {
    this._port = _port;
    this._server = app;

    if (staticPath) {
      app.use(StaticExpress(staticPath));
      this._staticPath = staticPath;
    }
    app.get("/", (request, response) => {
  response.sendFile(__dirname + "/main/index.html");
});

app.get("/post/:id", async (req, res) => {
  res.sendFile(__dirname + `/post/${req.params.id}.html`) || res.sendFile(__dirname + "/main/404.html");
})

app.use(function(req, res) {
  res.sendFile(__dirname + "/main/404.html");
});

    app.get("/files", (_, res) => {
      let response = "";
      const files = readdirSync("backup/").filter(fl => fl.endsWith(".xlsx"));
      for (var i = 0; i < files.length; i++) {
        const file = files[i];
        response += `<b>${i+1}.</b> <b><a href="/${file}">${file}</a></b><br />`;
      }
      res.send(`<pre>File List</pre><br /><br />${response}`);
    });
  }

  run() {
    this._server.listen(this._port, () => {
      console.log("Listening to", this._port);
    });
    return this._server;
  }
}

module.exports = ServerListener;