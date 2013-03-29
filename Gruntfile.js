//Help with ember: http://emberjs.com/blog/2013/03/21/making-ember-easier.html
//noteworthy asset pipeline lib: https://github.com/jriecken/asset-smasher
//compile ember templates: https://github.com/dgeb/grunt-ember-templates
//require for the browser: https://github.com/LearnBoost/browserbuild
//watch for changes with grunt: https://github.com/gruntjs/grunt-contrib-watch

module.exports = function(grunt) {
  var fs = require('fs');
  var fs_path = require('path');
  var md5 = require('MD5');
  var yaml = require('js-yaml');
  var path = require('path');
  var root = path.normalize(__dirname + "/");
  var lib = root + "lib/";
  var tmp = root + "tmp/";
  var javascript = root + "public/javascript/"
  var stylesheets = root + "public/stylesheets/"
  var manifest_path = root + 'public/manifest.yml'
  
  var generateNameWithHash = function(path) {
    var extension = fs_path.extname(path);
    var basename = fs_path.basename(path, extension);
    var dirname = fs_path.dirname(path);
    var file = grunt.file.read(path);
    var hash = md5(file);

    return dirname + "/" + basename + "-" + hash + extension;
  };

  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

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
          tmp + 'templates.js',
          root + 'routes/**/*.js', 
          root + 'models/**/*.js', 
          root + 'views/**/*.js', 
          root + 'controllers/**/*.js'],
          dest: javascript + 'application.js'
      } 
    },
    uglify: {
      dist: {
        src: [javascript + 'application.js'],
        dest: javascript + 'application.min.js'
      } 
    },
    jshint: {
      options: {
        browser: true
      }
    },
    generate_manifest: {
      paths: [javascript + 'application.js', 
              javascript + 'application.min.js',
              stylesheets + 'application.css'] 
    },
    less: {
      development: {
        options: {
          paths: ["assets/stylesheets"]
        },
        files: {
          "public/stylesheets/application.css" : "assets/stylesheets/application.less"
        }
      },
      production: {
        options: {
          paths: ["assets/stylesheets"],
          yuicompress: true,
        },
        files: {
          "public/stylesheets/application.css" : "assets/stylesheets/application.less"
        }
      }
    },
    ember_templates: {
      compile: {
        options: {
          templateName: function(sourceFile) {
            return sourceFile.replace(lib, '');
          }
        },
        files: {
          "tmp/templates.js" : [root + "templates/*.handlebars"]
        }
      }
    }});

  grunt.registerMultiTask('generate_manifest', "Generate md5 manifest", function(){
    if(this.target == 'paths') {
      var manifest = {};
      this.data.forEach(function(path){
        var dest = generateNameWithHash(path);
        fs.renameSync(path, dest);
        manifest[fs_path.basename(path)] = fs_path.basename(dest);
      });
      console.log("Writing manifest to " + manifest_path);
      grunt.file.write(manifest_path, yaml.dump(manifest));
    }
  });
  grunt.registerTask('default', ['ember_templates', 'concat', 'uglify', 'less:production', 'generate_manifest']);
};
