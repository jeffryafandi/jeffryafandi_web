const express = require("express");
const app = express();


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/web/index.html");
});

app.use(function(req, res) {
  res.sendFile(__dirname + "/web/404.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
