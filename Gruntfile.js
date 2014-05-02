/*jshint camelcase: false */
/*global module:false */

module.exports = function(grunt) {
  grunt.initConfig({


    /*
       A simple ordered concatenation strategy.
       This will start at frontend/app/app.js and begin
       adding dependencies in the correct order
       writing their string contents into
       'frontend/public/application.js'

       Additionally it will wrap them in evals
       with @ sourceURL statements so errors, log
       statements and debugging will reference
       the source files by line number.

       You would set this option to false for
       production.
    */
    neuter: {
      'dist/application.js': 'src/*.js'
    },

    uglify: {
      'dist/application.min.js': 'dist/application.js'
    },

    /*
      Watch files for changes.

      Changes in frontend/dependencies/ember.js or application javascript
      will trigger the neuter task.

      Changes to any templates will trigger the ember_templates
      task (which writes a new compiled file into frontend/dependencies/)
      and then neuter all the files again.
    */
    watch: {
	    
    },



    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
//          'frontend/public/css/styles.css': 'frontend/app/assets/css/styles.scss',
//          'frontend/public/css/print.css': 'frontend/app/assets/css/print.scss',
//         'frontend/public/css/print_ie.css': 'frontend/app/assets/css/print_ie.scss'
        }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);



  /*
    Default task. Compiles templates, neuters application code, and begins
    watching for changes.
  */
  grunt.registerTask('default', [
    'neuter',
    'sass',
    'uglify'
  ]);

};
