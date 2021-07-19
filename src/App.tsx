import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { history } from './helper/common';
import { store } from './helper/store';
import { urlRoutes } from './helper/constants';
import GuardedRoute from './components/GuardedRoute/GuardedRoute';
import Header from './components/Header/Header';
import Login from './pages/Login/Login.lazy';
import Home from './pages/Home/Home.lazy';
import Employee from './pages/Employees/Employees.lazy';
import Notify from './components/Notify/Notify';

/**
 * Configure routings for all public and authenticated routes
 */
function App() {
  return (
      <Provider store={store}>
        <Header />
        <Notify />
        <Router history={history}>
          <Switch>
            <Route exact path={urlRoutes.LOGIN} component={Login} />
            <GuardedRoute exact path={urlRoutes.HOME} component={Home} />
            <GuardedRoute exact path={urlRoutes.EMPLOYEES} component={Employee} />
            <Route render={() => <Redirect to={urlRoutes.LOGIN} />} />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
