const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackEsmodulesPlugin = require('webpack-module-nomodule-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const options = {
  extensions: ['js', 'jsx'],
  exclude: [
    '/node_modules/',
  ],
};

module.exports = [
  {
    mode: process.env.NODE_ENV || 'development',
    name: 'legacy',
    entry: path.resolve(__dirname, './src/index.jsx'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env',
                  {
                    targets: {
                      browsers: [
                        'ie 9',
                      ],
                    },
                    useBuiltIns: 'usage',
                    modules: false,
                    corejs: 2,
                  }],
              ],
            },
          },
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
      // path: path.join(__dirname, 'public', extraPath),
      filename: '[name]_legacy.js',
      // clean: true,
    },
    plugins: [
      new ESLintPlugin(options),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: path.resolve(__dirname, './index.html'),
      }),
      new HtmlWebpackEsmodulesPlugin('legacy', 'minimal'),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [],
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, './public'),
    },
  },
  {
    name: 'esm',
    mode: process.env.NODE_ENV || 'development',
    entry: path.resolve(__dirname, './src/index.jsx'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env',
                  {
                    targets: {
                      browsers: [
                        'supports es6-module',
                      ],
                    },
                    useBuiltIns: 'usage',
                    modules: false,
                    corejs: 2,
                  }],
              ],
            },
          },
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
      // path: path.join(__dirname, 'public', extraPath),
      filename: '[name].js',
      // clean: true,
    },
    plugins: [
      new ESLintPlugin(options),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: path.resolve(__dirname, './index.html'),
      }),
      new HtmlWebpackEsmodulesPlugin('modern', 'minimal'),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [],
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, './public'),
    },
  },
];
