'use strict';
var hapi = require('hapi')
  , path = require('path')
  , requireAll = require('require-all')
  , server = new hapi.Server('localhost', 8000, {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  })
  , apis;

// include all apis in api directory
apis = requireAll(path.join(__dirname, 'api'));

Object.keys(apis).forEach(function (key) {
  apis[key].index(server);
});

// enable system logging
server.pack.register(require('good'), function (err) {
  if (err) {
    throw err;
  }
});

// create documentation for apis
server.pack.register({
  plugin: require('hapi-swagger'),
  options: {
    apiVersion: require(path.join('..', 'package.json')).version
  }
}, function (err) {
  if (err) {
    throw err;
  }
});

server.start(function () {
  console.log('Listening on ' + server.info.uri + '...');
});
