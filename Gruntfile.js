module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        options: {
          separator: ';\n',
          banner: '/*!\n'
                + ' * Selectors.js - https://github.com/selectors/selectors.js\n\n'
                + ' * Released under the MIT license\n'
                + ' * https://github.com/selectors/selectors.js/blob/master/LICENSE.md\n\n'
                + ' * Last built: <%= grunt.template.today("dddd, dS mmmm yyyy; h:MM:ss TT") %>\n'
                + ' */\n\n'
                + '"use strict";',
          process: function(src, filepath) {
            return '\n/* Source: ' + filepath
                + '\n * -------------------------------------------------------------------------------------'
                + src.replace(/^\/\* https:\/\/github.com\/selectors\/selectors\.js/, '');
          }
        },
        src: [
          'src/selectors.js',
          'src/helper.js',
          'src/W3Core.js',
          'src/W3Extended.js',
          'src/W3Grammar.js',
          'src/namespaces.js',
          'src/attributes.js',
          'src/pseudo.js'
        ],
        dest: 'dist/selectors.js'
      },
      htmlStrict: {
        options: {
          process: function(src, filepath) {
            return '\n/* Source: ' + filepath
                + '\n * -------------------------------------------------------------------------------------'
                + src.replace(/^\/\* https:\/\/github.com\/selectors\/selectors\.js/, '');
          }
        },
        src: [
          'dist/selectors.js',
          'src/addon/htmlStrict.js'
        ],
        dest: 'dist/selectors-html.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! Selectors.js v<%= pkg.version %> | '
						  + '(c) https://github.com/selectors/selectors.js | https://github.com/selectors/selectors.js/blob/master/LICENSE.md */\n',
      },
      dist: {
        files: {
          'dist/selectors.min.js': ['dist/selectors.js'],
          'dist/selectors-html.min.js': ['dist/selectors-html.js']
        }
      }
    },
    jasmine: {
      dist: {
        src: "dist/selectors.min.js",
        options: {
          specs: "test/*.js"
        }
      },
      htmlStrict: {
        src: "dist/selectors-html.min.js",
        options: {
          specs: [
            "test/addon/s._isValidHtmlAttribute.js",
            "test/addon/s._isValidHtmlElement.js"
          ]
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['concat', 'uglify', 'test']);
};