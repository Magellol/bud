const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const config = Object.assign({}, baseConfig);

config.output.filename = 'bundle.[hash].js';

config.module.loaders = [
  ...config.module.loaders,
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css?modules',
      'postcss'
    )
  }
];

config.plugins = [
  ...config.plugins,
  new ExtractTextPlugin('main.[hash].css'),
  new ExtractTextPlugin('main.css'),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    comments: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
];

module.exports = config;
