import React from 'react';
import { shallow } from 'enzyme';
import { loginActions } from './login.action';
import { loginConstants } from './actions-types';
import { urlRoutes } from '../helper/constants';
import { act } from 'react-dom/test-utils';

describe('Login Actions', () => {
  let dispatch = jest.fn();
  let history = {
    push: jest.fn()
  };

  test('trigger logout', () => {
    act(async () => {
      loginActions.logout()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: loginConstants.LOGOUT_SUCCESS
      });
      expect(history.push).toHaveBeenCalledTimes(1);
    });
  });

})