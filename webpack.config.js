const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new WebpackNotifierPlugin({
      title: 'Polymer (2) JS',
      alwaysNotify: true
    })
  ],
  module: {
    rules: [{
      test: /\.html$/,
      loaders: ['babel-loader', 'wc-loader?minify=true']
    },{
      test: /\.js?$/,
      exclude: ['node_modules', './dist/bundle.js'],
      loader: 'babel-loader'
    }]
  },
  devServer: {
    contentBase: './'
  },
  resolve: {
    mainFields: ['browserify', 'browser', 'module', 'main']
  }
}