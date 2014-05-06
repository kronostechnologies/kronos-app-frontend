/*jshint camelcase: false */
/*global module:false */

module.exports = function(grunt) {
  grunt.initConfig({

    copy: {
      build: { 
	files: [
	]
      }
    },

    uglify: {
      build: {
        options: {
          sourceMap:true,
          mangle: true
        },
        files: {
          'js/application.min.js': 'js/application.js',
          'js/list.min.js': 'js/list.js',
          'js/jquery.ajaxUploader.min.js': 'js/jquery.ajaxUploader.js',
          'js/jquery.one-to-many.min.js': 'js/jquery.one-to-many.js',
          'js/jquery.pagination.min.js': 'js/jquery.pagination.js',
          'js/jquery.iphoneui.min.js': 'js/jquery.iphoneui.js',
          'js/jquery.pseudo.min.js': 'js/jquery.pseudo.js'
        }
      }
    },


    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['package.json', 'bower.json'],
        push: true,
	pushTo: 'origin'
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);



  /*
    Default task. Compiles templates, neuters application code, and begins
    watching for changes.
  */
  grunt.registerTask('default', [
    'copy',
    'uglify'
  ]);
  
  grunt.registerTask('release', [
    'default',
    'bump',
  ]);

};
