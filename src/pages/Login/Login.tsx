import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import styles from './Login.module.scss';
import { useForm, Controller } from "react-hook-form";
import { 
  FormControl, 
  Button, 
  Card,
  Alert } from 'react-bootstrap';
import { loginActions } from './../../_actions';
import { urlRoutes } from './../../helper/constants';
import { history } from '../../helper/common';

interface IUser {
  username: string;
  password: string;
}

/**
 * Login page
 * @param props 
 * @returns 
 */
const Login = (props: any) => {
 
  const { user, loggedIn, login } = props;

  const { control, formState: { errors }, handleSubmit } = useForm();

  // If user is already logged in the redirect to home page
  if(user && user.username) history.push(urlRoutes.HOME);

  // on user login
  const onSubmit = (data: IUser) => {
    login(data.username, data.password);
  };

  return (
    <Card body className={styles.Login}>
      <h3>Login</h3>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Alert variant="danger" show={loggedIn===false}>
          Username and password is incorrect.
        </Alert>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) =>  <FormControl {...field} placeholder="Username" /> }
        />
        <div className="validation-error">{errors.username && "Username is required"}</div>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) =>  <FormControl {...field} type="password" placeholder="Password" className="top-margin" /> }
        />
        <div className="validation-error">{errors.password && "Password is required"}</div>
        <Button type="submit" size="sm" className="top-margin">Login</Button>
      </form>
    </Card>
  )
};

const mapState = (state: any) => {
  const { authentication } = state;
  const { loggedIn, user } = authentication;
  return { loggedIn, user };
}

const actionCreators = {
  login: loginActions.login
}

export default connect(mapState, actionCreators)(Login);
