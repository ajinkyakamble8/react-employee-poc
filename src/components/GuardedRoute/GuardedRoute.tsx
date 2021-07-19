import React from 'react';
import { connect } from 'react-redux';
import styles from './GuardedRoute.module.scss';
import { Route, Redirect, Router } from "react-router-dom";
import { urlRoutes } from './../../helper/constants';
import { history } from '../../helper/common';

/**
 * To configure authenticated routes for logged in user only
 * @param param0 
 * @returns 
 */
const GuardedRoute = ( { component: Component, user, ...rest }: any) => {
  
  const auth = (user && user.username) || false;

  return (
    <Router history={history}>
      <Route {...rest} render={(props) => (
          auth ? <Component {...props} />
              : <Redirect to={urlRoutes.LOGIN} />
      )} />
    </Router>
  )
};

const mapState = (state: any) => {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const actionCreators = {}

export default connect(mapState, actionCreators)(GuardedRoute);
