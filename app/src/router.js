import express from 'express';
import serverRender from './renderMiddleware';

const router = express();

if (process.env.NODE_ENV === 'production') {
  router.use(express.static('dist'));
  router.use(serverRender);
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');

  const compiler = webpack(webpackConfig);

  router.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig[0].output.publicPath,
    stats: {
      colors: true,
    },
  }));
  router.use(webpackHotMiddleware(compiler));
  router.use(serverRender);
}

export default router;
