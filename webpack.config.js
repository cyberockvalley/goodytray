const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'?'development':'production';

const styleLoader = require("style-loader")
const cssLoader = require("css-loader")
const sassLoader = require("sass-loader")

const js = {
  test: /\.js$/,
  exclude: [/node_modules/],
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['react', 'es2015'],
      plugins: ['transform-class-properties']
    }
  }
}

const fonts = {
  test: /\.(woff|ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  exclude: [/node_modules/],
  use: ['file-loader']
}

const css = {
  test: /\.css$/,
  use: [
     // style-loader
     { loader: 'style-loader' },
     // css-loader
     {
       loader: 'css-loader',
       options: {
         modules: true
       }
     },
     // sass-loader
     { loader: 'sass-loader' }
  ]
}

const serverConfig = {
  mode: devMode,
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  entry: {
    'index.js': path.resolve(__dirname, 'src/index.js')
  },
  module: {
    rules: [js, fonts, css]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]'
  }
}

const clientConfig = {
  mode: devMode,
  target: 'web',
  entry: {
    'multipleRoutes.js': path.resolve(__dirname, 'src/public/multipleRoutes.js')
  },
  module: {
    rules: [js, fonts, css]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name]'
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
    
  }
}

module.exports = [serverConfig, clientConfig]
