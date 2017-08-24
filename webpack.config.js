const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }),
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
      test: /\.html$/,
      use: 'text-loader'
    },{
      test: /\.js?$/,
      exclude: ['node_modules', './dist/app.js'],
      loader: 'babel-loader'
    }]
  }
}