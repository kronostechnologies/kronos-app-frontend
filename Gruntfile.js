// vim: set ts=2 sw=2 sts=2 et :
/* jshint camelcase: false, node:true, indent: 2 */
/* global module:false */

module.exports = function(grunt) {

  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');

  grunt.initConfig({

    bump: {
      options: {
        files: ['package.json'],
        commitFiles: ['js/dist/*.js', 'package.json'],
        push: true,
        pushTo: 'origin'
      }
    },

    webpack: {
	  build: webpackConfig,
	  dev: Object.assign({
        mode: "development",
        watch: true
      }, webpackConfig)
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: '@babel/register',
          slow: 100
        },
        src: ['./js/**/*.test.js']
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
    'build-dev'
  ]);

  grunt.registerTask('release', 'Release', function(versionType){
    if(!versionType){
      versionType='patch';
    }
    grunt.task.run('build');
    grunt.task.run('mochaTest');
    grunt.task.run('bump:' + versionType);
    grunt.task.run('publish');
  });

};
