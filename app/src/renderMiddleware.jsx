import React from 'react';
import express from 'express';
import { createStore } from 'redux';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import reactApp from './reducers';

let Application = require('./components/Application').default;

const router = express.Router();

router.get('*', (req, res) => {
  const preloadedState = {
    posts: ['Server loaded post'],
  };
  const store = createStore(reactApp, preloadedState);
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Application />
    </Provider>,
  );
  const finalState = store.getState();
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')}
        </script>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `);
});

export default router;
