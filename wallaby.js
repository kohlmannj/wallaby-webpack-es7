var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel');
var webpack = require('webpack');

var wallabyPostprocessor = wallabyWebpack({
    plugins: [
      new webpack.DefinePlugin({
        _PRODUCTION_: true
      }),

      new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
      )
    ],

    resolve: {
      modulesDirectories: ["node_modules", "bower_component"],
      extensions: [".js", ".jsx"]
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
      { pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      { pattern: 'node_modules/chai/chai.js', instrument: false},
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
        // other babel options
        stage: 0    // https://babeljs.io/docs/usage/experimental/
      }),

      'js/**/*.coffee': wallaby.compilers.coffeeScript({
        // CoffeeScript compiler specific options
      })
    },

    testFramework: "mocha@2.0.1",

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
