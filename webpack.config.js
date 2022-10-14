const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// const {
//   CleanWebpackPlugin
// } = require("clean-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    watchFiles: ['src/**/*', 'public/**/*'],
    hot: true,
    port: 9003,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin(),
  ]

};
