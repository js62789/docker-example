const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const Visualizer = require('webpack-visualizer-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const clientConfig = {

  name: 'client',

  target: 'web',

  devtool: isProd ? 'source-map' : 'cheap-module-source-map',

  entry: {
    client: [
      './src/client',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],

};

if (isProd) {
  clientConfig.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }));
  clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }));
} else {
  clientConfig.devtool = 'inline-source-map';
  clientConfig.entry.client.unshift('webpack-hot-middleware/client?name=client');
  clientConfig.plugins.push(new Visualizer());
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  clientConfig.plugins.push(new webpack.NamedModulesPlugin());
}

const serverConfig = {

  name: 'server',

  target: 'node',

  externals: [nodeExternals()],

  entry: {
    server: './src/server',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
    ],
  },

  plugins: [
    new webpack.IgnorePlugin(/\.css$/),
    new ExtractTextPlugin('styles.css'),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],

};

module.exports = [clientConfig, serverConfig];
