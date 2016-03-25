const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const common = {

  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app + "/js/app.js"
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
      },
      /*{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},*/
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    /*new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: 'src/index.html'
    }),*/
    new LiveReloadPlugin()
  ]
};


// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || 8000
    }
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}