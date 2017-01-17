const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'client', 'index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  postcss: [
    require('autoprefixer')({ // eslint-disable-line global-require
      browsers: '> 1%'
    })
  ],
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      fullPath: false
    })
  ]
};
