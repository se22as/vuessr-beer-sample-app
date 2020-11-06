/*
 * Base WebPack config file used in both the client and server.
 */
const webpack = require('webpack');

// config() will read the .env file, parse the contents, assign it to process.env
require('dotenv').config();

// Production environments should specify the environment variable "BASE_URL" if the application
// is to be served at a URL other than root. The scripts in package json include setting of
// "BASE_URL" for production builds ("build" script)
// The "BASE_URL", is needed for the following:
// - server's StaticRouter's basename (src/server/renderer.jsx) (without a trailing slash)
// - client's BrowserRouter's basename (src/client/client.jsx) (without a trailing slash)
// - path to images for the footer which are in the "public" folder (needs a trailing slash)
// Set up the BASE_URL parameter, ensuring it does not have a trailing slash
let BASE_URL = '';
if (process.env.BASE_URL) {
  BASE_URL = process.env.BASE_URL.toString().trim();
  if (BASE_URL.substr(-1) === '/') {
    BASE_URL = BASE_URL.substr(0, BASE_URL.length - 1);
  }
}

module.exports = {
  output: {
    // publicPath : allows you to specify the base path for all the assets within your app
    // must end in a trailing slash, https://webpack.js.org/guides/public-path/
    publicPath: (BASE_URL) ? `${BASE_URL}/` : '',
  },

  module: {
    rules: [
      // specify the loader to convert .vue files into standard JavaScript
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          },
          // other vue-loader options go here
        },
      },
      // tell WebPack to use its babel loader to run Babel on every file it runs through
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // enable importing of images, e.g. import facebookImage from '../images/facebook.png';
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
  },

  // For bundle renderer source map support
  // SourceMaps are used to map code in a compressed/minified file back to the original file
  devtool: '#source-map',

  plugins: [
    // define variables to be used in the application, this is used for the routers' base
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(BASE_URL),
      'process.env.EXPRESS_SERVER_PORT': JSON.stringify(process.env.EXPRESS_SERVER_PORT),
      'process.env.INCLUDE_BEER_INGREDIENTS': JSON.stringify(process.env.INCLUDE_BEER_INGREDIENTS),
    }),
  ],
};
