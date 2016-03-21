module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';\n'
      },
      dist: {
        src: [
          'src/selectors.js',
          'src/W3Core.js',
          'src/W3Extended.js',
          'src/W3Grammar.js'
        ],
        dest: 'dist/selectors.js'
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
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

  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('test', ['jasmine']);
};