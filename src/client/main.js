/**
 * Entry point for the client side application.
 *
 * "webpack.client.config.js" is where this file is specified as the client side entry point.
 */
import 'core-js'; // replacement for babel-polyfill in babel 7.4 & above
import 'regenerator-runtime/runtime'; // replacement for babel-polyfill in babel 7.4 & above

import createApp from '../app';

const { app, router, store } = createApp();

// eslint-disable-next-line no-underscore-dangle
const storeInitialState = window.__INITIAL_STATE__;
if (storeInitialState) {
  // We initialize the store state with the data injected from the server
  store.replaceState(storeInitialState);
}

router.onReady(() => {
  app.$mount('#app');
});
