import App from '../components/App';
import Home from './Home';
import Dashboard from './Dashboard';
import Monthly from './Monthly';
import NotFoundError from '../components/NotFoundError';
import { loadIfAuthorized } from '../helpers/auth';

module.exports = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: '/dashboard',
      getComponent: (nextState, callback) => loadIfAuthorized(Dashboard, callback)
    },
    {
      path: '/monthly/:year/:month',
      getComponent: (nextState, callback) => loadIfAuthorized(Monthly, callback)
    },
    { path: '*', component: NotFoundError }
  ]
};
