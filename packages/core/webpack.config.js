const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'es.core.js',
    library: 'essenza',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: 'babel-loader',
    }],
  },
};