import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import Reset from './styles/Reset';
import Common from './styles/Common';

import GlobalFont from './styles/font/font.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Reset />
    <GlobalFont />
    <Common />
    <Router />
  </React.StrictMode>
);
