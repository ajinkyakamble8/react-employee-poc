import React from 'react';
import { mount, shallow } from 'enzyme';
import GuardedRoute from './GuardedRoute';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { act } from 'react-dom/test-utils';
import { urlRoutes } from '../../helper/constants';
import Home from '../../pages/Home/Home';

const mockStore = configureMockStore();
const store = mockStore({
  authentication: {
    loggedIn: false,
    user: { username: '' }
  }
});

describe('<GuardedRoute />', () => {
  let component: any;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <GuardedRoute />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should mount for logged in users', () => {
    act(async () => {
      const store1 = mockStore({
        authentication: {
          loggedIn: false,
          user: { username: 'test' }
        }
      });
      component = mount(
        <Provider store={store1}>
          <GuardedRoute exact path={urlRoutes.HOME} component={Home} />
        </Provider>
      );
      expect(component.length).toBe(1);
    })
  });
});
