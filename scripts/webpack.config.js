var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app:[
      './src/main.js',
      './src/assets/css/iconfont.css',
      './src/assets/css/normalize.css'
    ]
  },
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.css'],
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
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
      title: '微信站点云平台',
      template: path.join(__dirname + '/index.html'),
      inject: 'body',
      hash:false,    //为静态资源生成hash值
      minify:{    //压缩HTML文件
        removeComments:false,    //移除HTML中的注释
        collapseWhitespace:true    //删除空白符与换行符
      }
    }),
    new CopyWebpackPlugin(
      [
        { from: 'src/assets', to: 'assets' }, //将本地资源ueditor目录copy到ouput(build)目录下
      ]
    ),
    new ExtractTextPlugin('[name].[chunkhash:8].css', {
      allChunks: true
    })
  ],
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime'],
    compact: false //false:不会提示as it exceeds the max of "100KB"
  }
}
