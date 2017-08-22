const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
// const UglifyEsPlugin = require('uglify-es-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.js',
  },
  devtool: 'source-map',
  plugins: [
    // new UglifyEsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new WebpackNotifierPlugin({
      title: 'Polymer v3',
      alwaysNotify: true
    })
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: ['node_modules', './dist/app.js'],
      loader: 'babel-loader'
    }]
  }
}