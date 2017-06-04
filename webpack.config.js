const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

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
    new UglifyEsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
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
  }
}