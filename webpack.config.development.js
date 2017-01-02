const webpack = require('webpack');
const baseConfig = require('./webpack.config.base.js');

const config = Object.assign({}, baseConfig);

config.module.loaders = [
  ...config.module.loaders,
  {
    test: /\.css$/,
    loaders: ['style', 'css?modules&sourceMap', 'postcss']
  }
];

config.plugins = [
  ...config.plugins,
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
];

module.exports = config;
