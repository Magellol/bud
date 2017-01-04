import App from '../components/App';
import Home from './Home';
import Dashboard from './Dashboard';
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
    { path: '*', component: NotFoundError }
  ]
};
