'use strict';
var path = require('path')
  , yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , Generator;

Generator = module.exports = yeoman.generators.Base.extend();

Generator.prototype.prompting = function prompting() {
  var done = this.async();

  this.log(yosay('Welcome to ngPoly!'));

  // ask for app name
  // get preferred langugaes
  this.prompt([{
    name: 'appName',
    message: 'What is the app\'s name?'
  },
  {
    name: 'host',
    message: 'What host should the client run on?',
    default: 'localhost'
  },
  {
    name: 'port',
    message: 'Which port should the client run on?',
    default: 3000
  },
  {
    name: 'appDir',
    message: 'Which folder should the client be developed in?',
    default: 'app'
  },
  {
    type: 'list',
    name: 'markup',
    message: 'Which is the preferred markup language?',
    default: 'jade',
    choices: [
      {
        name: 'HAML',
        value: 'haml'
      },
      {
        name: 'HTML',
        value: 'html'
      },
      {
        name: 'Jade',
        value: 'jade'
      }
    ]
  },
  {
    type: 'list',
    name: 'appScript',
    message: 'Which is the preferred application scripting language?',
    default: 'js',
    choices: [
      {
        name: 'CoffeeScript',
        value: 'coffee'
      },
      {
        name: 'JavaScript',
        value: 'js'
      }
    ]
  },
  {
    type: 'confirm',
    name: 'controllerAs',
    message: 'Want to use Controller As syntax?',
    default: true
  },
  {
    type: 'confirm',
    name: 'passFunc',
    message: 'Should functions be defined and passed instead of defined inline (in callbacks)?',
    default: true
  },
  {
    type: 'confirm',
    name: 'namedFunc',
    message: 'Want to use named functions instead of anonymous?',
    default: true
  },
  {
    name: 'unitTestDir',
    message: 'Where should client unit tests be saved?',
    default: 'app'
  },
  {
    type: 'list',
    name: 'testScript',
    message: 'Which is the preferred test scripting language?',
    default: 'js',
    choices: [
      {
        name: 'CoffeeScript',
        value: 'coffee'
      },
      {
        name: 'JavaScript',
        value: 'js'
      }
    ]
  },
  {
    type: 'list',
    name: 'testFramework',
    message: 'Which is the preferred unit testing framework?',
    default: 'jasmine',
    choices: [
      {
        name: 'Jasmine',
        value: 'jasmine'
      },
      {
        name: 'Mocha with Chai',
        value: 'mocha'
      }
    ]
  },
  {
    type: 'list',
    name: 'style',
    message: 'Which is the preferred style language?',
    default: 'less',
    choices: [
      {
        name: 'CSS',
        value: 'css'
      },
      {
        name: 'LESS',
        value: 'less'
      },
      {
        name: 'SCSS',
        value: 'scss'
      },
      {
        name: 'Stylus',
        value: 'styl'
      }
    ]
  },
  {
    type: 'confirm',
    name: 'polymer',
    message: 'Should Polymer support be enabled?',
    default: true
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Should a framework be setup?',
    choices: [
      {
        name: 'none',
        value: 'none'
      },
      {
        name: 'Bootstrap with AngularStrap',
        value: 'angularstrap'
      },
      {
        name: 'Bootstrap with UI Bootstrap',
        value: 'uibootstrap'
      },
      {
        name: 'Foundation with Angular Foundation',
        value: 'foundation'
      }
    ]
  },
  {
    type: 'confirm',
    name: 'ngRoute',
    message: 'Should ngRoute be used instead of UI Router?',
    default: false
  },
  {
    type: 'checkbox',
    name: 'bower',
    message: 'Which additonal Bower components should be installed?',
    choices: [
      {
        name: 'Angular Animate',
        value: 'animate'
      },
      {
        name: 'Angular Cookies',
        value: 'cookies'
      },
      {
        name: 'Angular Resource',
        value: 'resource'
      },
      {
        name: 'Angular Sanitize',
        value: 'sanitize'
      },
      {
        name: 'Angular Touch',
        value: 'touch'
      },
      {
        name: 'Font Awesome',
        value: 'fontawesome'
      },
      {
        name: 'Lo-Dash',
        value: 'lodash'
      },
      {
        name: 'Restangular (installs Lo-Dash)',
        value: 'restangular'
      }
    ]
  },
  {
    type: 'confirm',
    name: 'server',
    message: 'Should a Hapi server be setup?',
    default: false
  }], function (props) {
    this.appName = props.appName;
    this.appDir = props.appDir;
    this.host = props.host;
    this.port = props.port;
    this.markup = props.markup;
    this.appScript = props.appScript;
    this.controllerAs = props.controllerAs;
    this.passFunc = props.passFunc;
    this.namedFunc = props.namedFunc;
    this.testScript = props.testScript;
    this.testFramework = props.testFramework;
    this.unitTestDir = props.unitTestDir;
    this.style = props.style;
    this.polymer = props.polymer;
    this.ngRoute = props.ngRoute;
    this.framework = props.framework;
    this.bower = props.bower.join(',');
    this.server = props.server;

    done();
  }.bind(this));

};

Generator.prototype.configuring = function configuring() {
  // create a directory with appName, unless user is in a directory named appName
  if (this.appName !== this._.last(this.destinationRoot().split(path.sep))) {
    this.destinationRoot(this.appName);
  }

  // save config info
  this.config.set('markup', this.markup);
  this.config.set('appScript', this.appScript);
  this.config.set('controllerAs', this.controllerAs);
  this.config.set('passFunc', this.passFunc);
  this.config.set('namedFunc', this.namedFunc);
  this.config.set('testScript', this.testScript);
  this.config.set('testFramework', this.testFramework);
  this.config.set('style', this.style);
  this.config.set('ngRoute', this.ngRoute);
  this.config.set('lastUsedModule', 'home');

  if (this.server) {
    this.server = 'hapi'; // used in package.json
    this.config.set('server', 'hapi');
  }

  // force save to guarantee config exists for controller
  // tests randomly fail without this
  this.config.forceSave();

  this.context = {
    appName: this.appName,
    appDir: this.appDir,
    unitTestDir: this.unitTestDir,
    host: this.host,
    port: this.port,
    moduleName: this.appName,
    passFunc: this.passFunc,
    namedFunc: this.namedFunc,
    polymer: this.polymer,
    framework: this.framework,
    testFramework: this.testFramework,
    ngRoute: this.ngRoute,
    bower: this.bower,
    server: this.server
  };
};

Generator.prototype.writing = function writing() {
  // copy over common files
  this.copy('.bowerrc', '.bowerrc');
  this.copy('.editorconfig', '.editorconfig');
  this.copy('.jscsrc', '.jscsrc');
  this.copy('.jshintrc', '.jshintrc');
  this.template('_bower.json', 'bower.json', this.context);
  this.template('_build.config.js', 'build.config.js', this.context);
  this.template('_gulpfile.js', 'Gulpfile.js', this.context);
  this.template('_karma.config.js', 'karma.config.js');
  this.template('_package.json', 'package.json', this.context);
  this.copy('protractor.config.js', 'protractor.config.js');
  this.template('_readme.md', 'README.md');

  this.mkdir('gulp');
  this.copy('analyze.js', path.join('gulp', 'analyze.js'));
  this.template('_build.js', path.join('gulp', 'build.js'), this.context);
  this.template('_test.js', path.join('gulp', 'test.js'), this.context);
  this.copy('watch.js', path.join('gulp', 'watch.js'));
  this.mkdir(this.appDir);

  // create main module and index.html
  this.template('_app.' + this.appScript,
    path.join(this.appDir, 'app.' + this.appScript), this.context);
  this.template('_index.' + this.markup,
    path.join(this.appDir, 'index.' + this.markup), this.context);

  this.mkdir(path.join(this.appDir, 'fonts'));
  this.mkdir(path.join(this.appDir, 'images'));

  // if using Hapi, copy over files
  if (this.server === 'hapi') {
    this.mkdir('server');
    this.copy('server.' + this.appScript, path.join('server', 'index.' + this.appScript));

    this.mkdir(path.join('server', 'api'));
  }
};

Generator.prototype.install = function install() {
  if (!this.options['skip-install']) {
    this.installDependencies();
  }
};

Generator.prototype.end = function end() {
  this.composeWith('ng-poly:module', {
    args: ['home'],
    options: {
      module: 'home',
      markup: this.markup,
      style: this.style,
      'test-dir': this.testDir,
      'test-script': this.testScript,
      'controller-as': this.controllerAs,
      'pass-func': this.passFunc,
      'named-func': this.namedFunc,
      'ng-route': this.ngRoute
    }
  }, {
    local: require.resolve('../module'),
    link: 'strong'
  });
};
