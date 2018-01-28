var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    'app/app' : './resources/assets/js/app.js',
    'index' : './resources/assets/js/index.js',
    'app/routes/api' : './resources/assets/js/routes/api',
    'app/routes/web' : './resources/assets/js/routes/web',
    'app/routes/conversation':'./resources/assets/js/routes/conversation',
    'app/routes/speech-to-text':'./resources/assets/js/routes/speech-to-text',
    'app/routes/text-to-speech':'./resources/assets/js/routes/text-to-speech'
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: __dirname + "/"
  },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets : ['latest']
        }
    }]
  },
    resolve :{
        alias : {

        },
        extensions : ['.js','.jsx']
    },
  externals: nodeModules,
  devtool: 'sourcemap'
};
