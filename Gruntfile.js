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
      'dist/list.min.js': 'dist/list.js'
    },


    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['package.json', 'bower.json'],
        push: false
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
