var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel');
var webpack = require('webpack');
var path = require('path');

var wallabyPostprocessor = wallabyWebpack({
    plugins: [
      new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
      )
    ],

    resolve: {
      modulesDirectories: ['node_modules', path.join(__dirname, 'node_modules'), path.join(__dirname, 'bower_components')],
      extensions: ["", ".js", ".jsx"]
    }
  }
);

module.exports = function (wallaby) {
  return {
    // set `load: false` to all of source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
    files: [
      { pattern: 'node_modules/react-tools/src/test/phantomjs-shims.js', instrument: false},

      // to avoid loading react into each test manually
      { pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},

      { pattern: 'node_modules/chai/chai.js', instrument: false},

      { pattern: 'js/**/*.js*', load: false },
      { pattern: 'js/**/__tests__/*_spec.*', ignore: true }
    ],

    tests: [
      { pattern: 'js/**/__tests__/*_spec.*', load: false }
    ],

    compilers: {
      'js/**/*.js*': wallaby.compilers.babel({
        babel: babel,
        
        // NOTE: If you're using Babel 6, it should be `presets: ['es2015']` instead of `stage: 0`.
        // You will also need to
        // npm install babel-core (and require it instead of babel)
        // and
        // npm install babel-preset-es2015
        // See http://babeljs.io/docs/plugins/preset-es2015/
        
        stage: 0
      })
    },

    testFramework: "mocha",

    postprocessor: wallabyPostprocessor,

    debug: true,

    bootstrap: function () {
      var mocha = wallaby.testFramework;
      mocha.ui('bdd');
      window.expect = chai.expect;
      var should = chai.should();

      // required to trigger tests loading
      window.__moduleBundler.loadTests();
    }
  };
};
