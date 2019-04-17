const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    default: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}