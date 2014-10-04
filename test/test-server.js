/*global describe, before, it */
'use strict';
var assert = require('yeoman-generator').assert
  , helpers = require('yeoman-generator').test
  , path = require('path');

describe('ng-poly with server', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp-server'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        appName: 'temp-server',
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
      .on('end', done);
  });

  it('should create server files', function () {
    assert.file([
      'server/index.js'
    ]);
  });
});
