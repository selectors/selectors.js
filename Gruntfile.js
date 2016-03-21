module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n',
        banner: '/*!\n'
              + ' * Selectors.js - https://github.com/JamesDonnelly/Selectors.js\n\n'
              + ' * Released under the MIT license\n'
              + ' * https://github.com/JamesDonnelly/Selectors.js/blob/master/LICENSE.md\n\n'
              + ' * Last built: <%= grunt.template.today("dddd, dS mmmm yyyy; h:MM:ss TT") %>\n'
              + ' */\n\n'
              + '"use strict";',
        process: function(src, filepath) {
          return '\n/* Source: ' + filepath
              + '\n * -------------------------------------------------------------------------------------'
              + src.replace(/^\/\* https:\/\/github.com\/JamesDonnelly\/Selectors\.js/, '');
        },
      },
      dist: {
        src: [
          'src/selectors.js',
          'src/helper.js',
          'src/W3Core.js',
          'src/W3Extended.js',
          'src/W3Grammar.js',
          'src/pseudo.js'
        ],
        dest: 'dist/selectors.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! Selectors.js v<%= pkg.version %> | '
						  + '(c) https://github.com/JamesDonnelly/Selectors.js | https://github.com/JamesDonnelly/Selectors.js/blob/master/LICENSE.md */\n',
      },
      dist: {
        files: {
          'dist/selectors.min.js': ['dist/selectors.js']
        }
      }
    },
    jasmine: {
      src: "dist/selectors.min.js",
      options: {
        specs: "test/**/*.js"
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['concat', 'uglify', 'test']);
};