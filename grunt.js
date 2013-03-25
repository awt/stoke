//noteworthy asset pipeline lib: https://github.com/jriecken/asset-smasher

module.exports = function(grunt) {
  var yaml = require('js-yaml');
  var path = require('path');
  var root = path.normalize(__dirname+"/application/");
  var lib = root + "lib/"
  
  grunt.loadNpmTasks('grunt-ember-templates');
  //     Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'app/lib/**/*.js', 'app/app.js']
    },
    concat: {
      dist: {
        src: [
          lib + 'jquery.js',
          lib + 'handlebars.js',
          lib + 'ember.js',
          lib + 'bind.js',
          lib + 'app_def.js', 
          root + 'routes/**/*.js', 
          root + 'models/**/*.js', 
          root + 'views/**/*.js', 
          root + 'controllers/**/*.js'],
          dest: 'public/javascript/application.js'
      } 
    },
    min: {
      dist: {
        src: ['app/all.js'],
        dest: 'public/javascript/application.min.js'
      } 
    },
    jshint: {
      options: {
        browser: true
      }
    }
  });

  grunt.registerTask('generate_manifest', function(){
    var manifest = yaml.dump({file1 : 'file1alkdfj.js'});
    grunt.file.write('public/manifest.yml', manifest);
  });
  grunt.registerTask('default', 'concat min generate_manifest');


};
