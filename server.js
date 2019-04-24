const express = require('express')
const compression = require('compression')
const app = new (express)()
const path = require('path')
var bodyParser = require('body-parser');
const wechat=require('./server/wechat')

app.use(compression())
const PORT = 8081
let port = process.env.PORT || PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let load_path = '/dist/index.html'
app.use(express.static('./dist'))
app.use(express.static(path.join(__dirname, '/')));
require('./proxy')(app)

app.get("*", function (req, res) {
  res.sendFile(__dirname + load_path)
})
app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
