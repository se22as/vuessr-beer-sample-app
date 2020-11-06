/*
 * Creates "server-bundle.js" for the server containing the Server Code and the Vue App.
 */
const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const VueSSRPlugin = require('vue-server-renderer/server-plugin')
const baseConfig = require('./webpack.base.config.js');

const config = {
  // inform WebPack that we are building a bundle for NodeJS rather
  // than for the browser and to avoid packaging built-ins.
  target: 'node',

  // tell WebPack the root file of our server application
  entry: './src/server/main.js',

  // tell WebPack the name of the generated output file and where to put it
  output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // Outputs node-compatible modules instead of browser-compatible.
    libraryTarget: 'commonjs2',
  },

  // Tell WebPack to not bundle any libraries into our output bundle on the server
  // if that library exists in the "node-modules" folder. This is because on the server
  // Node can get the dependencies from node_modules on start up therefore they do not
  // have to be in the bundle
  // (unlike with the client bundle which has to have all the dependencies in it)
  externals: [webpackNodeExternals()],

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRPlugin(),
  ],
};

// merge the base config and this config together to produce the full server config
module.exports = merge(baseConfig, config);
