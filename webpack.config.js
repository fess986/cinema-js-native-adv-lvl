const path = require('path');
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
    port: 9000,
  },
  // plugins: [
  //   new CleanWebpackPlugin()
  // ]

};
