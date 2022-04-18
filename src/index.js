import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import Reset from './styles/Reset'
import Common from './styles/Common'

ReactDOM.root(
  <React.StrictMode>
    <Reset />
    <Common />
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);