var fs = require('fs');
var yaml = require('js-yaml');

module.exports = {
  load: function(callback) {
    try {
      fs.readFile('./public/manifest.yml', 'utf8', function(err, text){
        yaml.loadAll(text, function(doc){
          callback.call(this, doc);
        });
      });
    } catch(e) {
      console.log(e);
        response.send('there was an error loading the manifest');
    }
  }
}

