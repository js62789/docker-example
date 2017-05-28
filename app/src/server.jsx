import express from 'express';
import config from 'config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Application from './components/Application';
import reactApp from './reducers';

const PORT = config.get('port');

const app = express();

const renderFullPage = (html, preloadedState) => (
  `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/client.bundle.js"></script>
      </body>
    </html>
  `
);

app.get('/', (req, res) => {
  const preloadedState = {
    posts: ['Server loaded post'],
  };
  const store = createStore(reactApp, preloadedState);
  const html = ReactDOMServer.renderToString(<Provider store={store}><Application /></Provider>);
  const finalState = store.getState();
  res.send(renderFullPage(html, finalState));
});

app.use('/static', express.static('dist'));

app.listen(PORT);

console.log(`Running on http://localhost:${PORT}`);
