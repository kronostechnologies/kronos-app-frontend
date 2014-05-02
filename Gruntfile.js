/*jshint camelcase: false */
/*global module:false */

module.exports = function(grunt) {
  grunt.initConfig({

    copy: {
      main: { 
	files: [
          {expand:true, cwd: 'src/', src: '*.js', dest: 'dist/'}
	]
      }
    },

    uglify: {
      'dist/application.min.js': 'dist/application.js',
      'dist/list.min.js': 'dist/list.js',
      'dist/jquery.ajaxUploader.min.js': 'dist/jquery.ajaxUploader.js',
      'dist/jquery.one-to-many.min.js': 'dist/jquery.one-to-many.js',
      'dist/jquery.pagination.min.js': 'dist/jquery.pagination.js',
      'dist/jquery.iphoneui.min.js': 'dist/jquery.iphoneui.js',
      'dist/jquery.pseudo.min.js': 'dist/jquery.pseudo.js'
    },


    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['package.json', 'bower.json'],
        push: true,
	pushTo: 'master'
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
