const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    // compress: true,
    port: 9000,
    open: true,
    openPage: 'examples/demo.html',
    // hot: true,
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000,
    //   ignored: /node_modules/
    // }
  }
});