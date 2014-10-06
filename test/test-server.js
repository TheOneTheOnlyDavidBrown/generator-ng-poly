/*global describe, it */
'use strict';
var assert = require('yeoman-generator').assert
  , helpers = require('yeoman-generator').test
  , path = require('path');

describe('ng-poly with server and JavaScript', function () {
  it('should create server files', function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp-server-js'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        appName: 'temp-server-js',
        markup: 'html',
        appScript: 'js',
        controllerAs: false,
        passFunc: true,
        namedFunc: true,
        testScript: 'js',
        testDir: 'app',
        style: 'less',
        bower: [],
        server: true
      })
      .withGenerators([
        path.join(__dirname, '../module'),
        path.join(__dirname, '../route'),
        path.join(__dirname, '../controller'),
        path.join(__dirname, '../view')
      ])
      .on('end', function () {
        assert.file([
          'server/api',
          'server/index.js'
        ]);
        // TODO: investigate why a timeout is needed to prevent issues with other tests
        setTimeout(done, 100);
      });
  });

  it('should create server files c', function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp-server-coffee'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        appName: 'temp-server-coffee',
        markup: 'html',
        appScript: 'coffee',
        controllerAs: false,
        passFunc: true,
        namedFunc: true,
        testScript: 'js',
        testDir: 'app',
        style: 'less',
        bower: [],
        server: true
      })
      .withGenerators([
        path.join(__dirname, '../module'),
        path.join(__dirname, '../route'),
        path.join(__dirname, '../controller'),
        path.join(__dirname, '../view')
      ])
      .on('end', function () {
        assert.file([
          'server/api',
          'server/index.coffee'
        ]);
        // TODO: investigate why a timeout is needed to prevent issues with other tests
        setTimeout(done, 100);
      });
  });
});
