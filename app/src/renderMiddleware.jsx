import React from 'react';
import express from 'express';
import { createStore } from 'redux';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router-dom';
import reactApp from './reducers';
import Application from './components/Application';

const router = express.Router();

router.get('*', (req, res) => {
  const preloadedState = {
    posts: ['Server loaded post'],
  };
  const context = {};
  const store = createStore(reactApp, preloadedState);
  const html = ReactDOMServer.renderToString(
    <Router location={req.url} context={context}>
      <Provider store={store}>
        <Application />
      </Provider>
    </Router>,
  );

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    res.redirect(301, context.url);
    return;
  }

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
