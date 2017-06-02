import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Application from './components/Application';
import reactApp from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(reactApp, preloadedState);

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.getElementById('root'), // eslint-disable-line no-undef
  );
};

render(Application);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
  module.hot.accept('./components/Application', () => {
    render(require('./components/Application').default);
  });
}
