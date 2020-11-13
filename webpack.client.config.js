/*
 * Creates "client-bundle.js" for the client containing just the Vue App.
 *
 * This is created so that event handlers coded in JavaScript are available on the client browser.
 */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const config = {
  // do not need a 'target' as this is for the browser

  // tell WebPack the root file of our client application
  entry: {
    app: [
      './src/client/main.js',
    ],
  },

  // tell WebPack the name of the generated output file and where to put it
  output: {
    filename: 'client-bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  module: {
    rules: [
      // handle loading of css files
      {
        test: /\.css$/,
        use: [
          { loader: 'vue-style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
        ],
      },
    ],
  },

  // For bundle renderer source map support
  // SourceMaps are used to map code in a compressed/minified file back to the original file
  devtool: '#eval-source-map',

  plugins: [
    // copy anything from the src/public folder into the built public folder
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'public-assets'),
          to: path.resolve(__dirname, 'public'),
        },
      ],
    }),
  ],
};

// merge the base config and this config together to produce the full server config
module.exports = merge(baseConfig, config);
