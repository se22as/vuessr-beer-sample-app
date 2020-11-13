/**
 * Server starting point, a simple Express Server.
 */

const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
const dotenv = require('dotenv');

dotenv.config();

// create the bundle renderer using the html template file
const bundleRenderer = createBundleRenderer(
  require('./dist/vue-ssr-server-bundle.json'),
  {
    template: fs.readFileSync('./index.html', 'utf-8'),
  },
);

// Create the express app.
const server = express();

// open all the files/folders in the "public" directory to the outside world by telling Express
// to treat the "public" directory as a freely available public directory.
// so static assets can be served from ./public on the /public route.
server.use(express.static('public'));

// Render all other routes with the bundleRenderer.
server.get('*', (req, res) => {
  // create a render context object containing the request URL (the router needs this in
  // order to determine how to route) and the values to insert into the HTML template
  const prefix = process.env.BASE_URL ? `${process.env.BASE_URL}/` : '/';
  const context = {
    url: req.url,
    clientBundle: `${prefix}client-bundle.js`,
  };

  bundleRenderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.end(html);
    }
  });
});

//const port = process.env.EXPRESS_SERVER_PORT ? process.env.EXPRESS_SERVER_PORT : 8080;
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
