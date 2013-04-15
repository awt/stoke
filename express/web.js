var express = require('express');
var app = express();
var logger = require('express-logger');
var http = require('http');
var manifest = require(__dirname + '/lib/manifest.js');
var server = http.createServer(app);
var path = require('path');
require('jade');

manifest.load(function(manifest){
  console.log(manifest);
  app.locals({
    asset: function(opts){
      console.log(opts.type);
      //look up hashified name by name
      var name = path.basename(opts.src);
      var dirname = path.dirname(opts.src);
      var name_with_hash = manifest[name];
      var full_path_with_hash = dirname + '/' + name_with_hash;
      if('script' == opts.type) {
        return '<script type="text/javascript" src="' + full_path_with_hash + '"></script>';
      }
      else if('stylesheet' == opts.type) {
        return '<link type="text/css" rel="stylesheet" href="' + full_path_with_hash  + '"></link>';
      }
      else {
        throw "Unknown asset type"
      }
    }
  })
});
//Handle all uncaught exceptions
process.on('uncaughtException', function(err) {
    console.log(err);
});

app.set('views', __dirname + '/express/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));


routes = require(__dirname + '/routes');
app.get('/', routes.index);

// Server Listen
var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
