const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const options = {
  extensions: ['js', 'jsx'],
  exclude: [
    '/node_modules/',
  ],
};

module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new ESLintPlugin(options),
    new HtmlWebpackPlugin({
      title: '',
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, './public'),
  },
};
