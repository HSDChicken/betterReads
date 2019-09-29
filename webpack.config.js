const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }, 
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    }, {
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
        {loader: 'sass-loader'}
      ] 
    },{test:/\.(png|svg|jpg|gif)$/,use:['file-loader']}]
  },
  devServer: {
    publicPath: path.resolve(__dirname, '/build/'),
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000'
    },
    hot: true,
  },
  mode: process.env.NODE_ENV
}