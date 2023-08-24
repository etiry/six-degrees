import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
// import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import promise from 'redux-promise';

import Header from './containers/Header';
// import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);