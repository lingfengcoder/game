const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      '@babel/preset-env',
       //"es2015", { "modules": false }
    ],
     
    ignore: [
      "./src/perface.ts"
    ]
  }
};

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    //filename: "[name].js",//[name]-[id]-[hash]
    filename: "[name]-[id]-[hash].js",//
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'), //本地服务器所加载的页面所在的目录
    //contentBase: "./src/index.ts", //本地服务器所加载的页面所在的目录
    host: '192.168.88.113',
    port: 8081,
    inline: true,
    //colors: true,
    historyApiFallback: true, //不跳转
    inline: true,
    //hot: true
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          {
            loader: 'ts-loader',
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          babelLoader
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'public'
      },
      {
        from: 'node_modules/phaser/dist/phaser.min.js'
      }
    ]),
    new CleanWebpackPlugin(
      {
      root: __dirname,       　　　　　　　　　　//根目录
      verbose: true,        　　　　　　　　　　//开启在控制台输出信息
      dry: false        　　　　　　　　　　//启用删除文件
    }),//清除旧文件

    new HtmlWebpackPlugin({
      title: 'Hello World app',
      hash: true,
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      //template: "public/index.html",//new 一个这个插件的实例，并传入相关的参数,
      template: "./src/index.temp.html",//new 一个这个插件的实例，并传入相关的参数,
    }),

  ],
  resolve: {
    extensions: ['.ts', '.js']
  },

};
