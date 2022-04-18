import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import Reset from './styles/Reset';
import Common from './styles/Common';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Reset />
    <Common />
    <Router />
  </React.StrictMode>
);
