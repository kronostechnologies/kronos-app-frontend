// vim: set ts=2 sw=2 sts=2 et :
/* jshint camelcase: false, node:true, indent: 2 */
/* global module:false */

module.exports = function(grunt) {

  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');

  grunt.initConfig({

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['js/dist/*.js', 'package.json', 'bower.json'],
        push: true,
	      pushTo: 'origin'
      }
    },

    webpack: {
      options: webpackConfig,
      build: {
        output: {
          filename: "[name].min.js"
        },
        plugins: [
          new webpack.DefinePlugin({
            "process.env": {
              // This has effect on the react lib size
              "NODE_ENV": JSON.stringify("production")
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        ]
      },
      dev: {
        debug: true,
        watch: true
      }
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  
  grunt.registerTask('build', [
    'webpack:build'
  ]);
  
  grunt.registerTask('build-dev', [
    'webpack:dev'
  ]);

  grunt.registerTask('default', [
    'build',
    'webpack:dev'
  ]);


  grunt.registerTask('release', 'Release', function(versionType){
    if(!versionType){
      versionType='patch';
    }
    grunt.task.run('default');
    grunt.task.run('bump:' + versionType);
  });

};
