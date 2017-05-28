const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {

  context: path.resolve(__dirname, './src'),

  entry: {
    client: './client.jsx',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],

};

const serverConfig = {

  context: path.resolve(__dirname, './src'),

  target: 'node',

  externals: [nodeExternals()],

  entry: {
    server: './server.jsx',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],

};

module.exports = [clientConfig, serverConfig];
