// vim: set ts=2 sw=2 sts=2 et :
/* jshint camelcase: false, node:true, indent: 2 */
/* global module:false */

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
          'js/jquery.pseudo.min.js': 'js/jquery.pseudo.js',
          'js/jquery.BetterGrow.min.js': 'js/jquery.BetterGrow.js',
          'js/html5shiv.min.js': 'js/html5shiv.js'
        }
      }
    },

    jshint: {
      all: {
        src: ["Gruntfile.js", 'js/application.js', 'js/list.js'],
        options: {
          jshintrc: true
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


  grunt.registerTask('default', [
    'jshint',
    'copy',
    'uglify'
  ]);
  
  grunt.registerTask('release', [
    'default',
    'bump',
  ]);

};
