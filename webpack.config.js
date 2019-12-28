var webpack = require('webpack') // eslint-disable-line
var path = require('path') // eslint-disable-line

var FRONTEND_DIR = path.join(__dirname, 'frontend-api')
var DIR = path.join(__dirname)
var PUBLIC_DIR = path.join(__dirname, 'public')

var config = {
  entry: {
    boardBundle: FRONTEND_DIR + '/index.js',
    logicBundle: DIR + '/index.js',
  },
  output: {
    path: PUBLIC_DIR,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
          },
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
}

module.exports = config
