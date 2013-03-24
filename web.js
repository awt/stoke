var express = require('express');
var app = express();
var logger = require('express-logger');
var http = require('http');
var server = http.createServer(app);

require('jade');
app.set('view engine', 'jade');

routes = require('./routes');
app.get('/', routes.index);

// Server Listen
var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
