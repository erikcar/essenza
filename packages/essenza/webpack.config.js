const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'es.react.js',
    library: 'essenza',
    libraryTarget: 'umd',
    clean: true
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: 'babel-loader',
    }],
  },
 externals: {
    antd: 'antd',
    'react-router-dom': 'react-router-dom',
    react: 'react',
    '@essenza/core': '@essenza/core',
    'react-to-print': 'react-to-print'
  },
};