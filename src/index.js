import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <>
    <header>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </header>
    <App />
  </>,
  document.getElementById('root')
);

serviceWorker.unregister();