import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import reducer from './redux/reducers'; // imports ./redux/reducers/index.js

import App from './App';
import rootSaga from './redux/sagas'; // imports ./redux/sagas/index.js

// Initializing to an empty object, but here is where you could
// preload your redux state with initial values (from localStorage, perhaps)
const preloadedState = {};
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// flag to only use the logger if in development mode
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const theme = createMuiTheme({ 
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#47b8e0',
    },
    secondary: {
      main: '#34314c',
    }
  }
})
const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}><MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
