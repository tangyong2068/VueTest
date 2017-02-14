var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: [
    './src/main.js',
    './src/assets/css/iconfont.css',
    './src/assets/css/normalize.css'
  ],
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.vue$/,
        loaders: ['vue']
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.hbs$/,
        loaders: ['handlebars']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url?limit=100&name=images/[hash].[ext]',
        exclude: [/node_modules/]
      }
    ]
  },
  vue: {
    autoprefixer: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(process.cwd(), 'build/index.html'),
      title: '可视化数据平台',
      template: __dirname + '/index.hbs',
      inject: false
    })
  ],
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
