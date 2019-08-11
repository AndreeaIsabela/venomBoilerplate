const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const inProduction = (process.env.NODE_ENV === 'production');
const inTesting = (process.env.NODE_ENV === 'test');

let plugins = [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
  
    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false,
    }),
  
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: './index.html',
      excludeAssets: [/polyfills.*.js/]
    }),
  
    new HtmlWebpackExcludeAssetsPlugin()
  ];
  module.exports = {
    entry: {
      polyfills: path.resolve(__dirname, 'polyfills.js'),
      index: path.join(__dirname, 'app/main.ts'),
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, './app/')
      },
      extensions: ['.ts', '.js', '.vue', '.json', '.pug', '.styl']
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../../build/client')
    },
    optimization: {
      minimize: true
    },
    devServer: {
      proxy: [{
        context: ['/public', '/api', '/app'],
        target: 'http://localhost:8080',
      }]
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ],
        },
        {
          test: /\.styl(us)$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'stylus-loader'
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-syntax-dynamic-import']
            }
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    },
    performance: {
      hints: 'warning'
    },
  
    plugins,
  
    devtool: inProduction ? 'source-map' : 'inline-source-map',
  
    mode: inProduction ? 'production' : 'development',
  }
  
  if (inTesting) {
    const nodeExternals = require('webpack-node-externals');
  
    // exclude npm dependencies from test bundle
    module.exports.externals = [
      nodeExternals()
    ];
    // use inline source map so that it works with mocha-webpack
    module.exports.devtool = 'inline-cheap-module-source-map';
  }