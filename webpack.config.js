"use strict";

var webpack = require("webpack");
var path = require("path");

const configBase = {
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        loader: "babel-loader"
      }
    ]
  },
}

const mainConfig = Object.assign({}, configBase, {
  entry: "./src/app.js",
  target: "electron-main",
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "index.js"
  }
});

const rendererConfig = Object.assign({}, configBase, {
  entry: './src/renderer/app.js',
  target: "electron-renderer",
  output: {
    filename: "renderer/bundle.js"
  }
});


module.exports = [mainConfig, rendererConfig];