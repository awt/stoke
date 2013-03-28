var express = require('express');
var app = express();
var logger = require('express-logger');
var http = require('http');
var manifest = require('./express/lib/manifest.js');
var server = http.createServer(app);
var path = require('path');

manifest.load(function(manifest){
  console.log(manifest);
  app.locals({
    asset: function(opts){
      console.log(opts.type);
      //look up hashified name by name
      var name = path.basename(opts.src);
      var dirname = path.dirname(opts.src);
      var name_with_hash = manifest[name];
      if('script' == opts.type) {
        return '<script type="text/javascript" src="' + dirname + '/' + name_with_hash + '"></script>';
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

require('jade');
app.set('views', __dirname + '/express/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


routes = require('./express/routes');
app.get('/', routes.index);

// Server Listen
var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
