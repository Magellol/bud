import 'whatwg-fetch'; // I swear that's the only polyfill.

import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from './routes';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
