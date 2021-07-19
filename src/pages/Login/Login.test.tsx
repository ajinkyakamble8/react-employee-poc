import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from './Login';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import { Alert, Button } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  authentication: {
    loggedIn: false,
    user: { username: '' }
  }
});

const initProps = {
  login: jest.fn()
}

describe('<Login />', () => {
  let component: any;
  
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Login {...initProps} />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('Should display Home component if already logged in', () => {
    const history = {
      push: jest.fn()
    }
    const store1 = mockStore({
      authentication: {
        loggedIn: true,
        user: { username: 'test' }
      }
    });
    act(async ()=> {
      component = mount(
        <Provider store={store1}>
          <Login {...initProps} />
        </Provider>
      );
      expect(history.push).toHaveBeenCalled();
    });
  })

  test('Required field Validation', () => {
    act(async () => {
      component.find('form').simulate('submit', { target: component.find('button[type="submit"]') });
      expect(component.find(<div className="validation-error">Username is required</div>)).toHaveLength(1);
      expect(component.find(<div className="validation-error">Password is required</div>)).toHaveLength(1);
    });
  });

  test('Login Successful', () => {
    act(async () => {
      await new Promise((res, rej) => res(1));
      component.find('input[name="username"]').simulate('change', {target : { value: 'test' } });
      component.find('input[name="password"]').simulate('change', {target : { value: 'test1' } });
      //component.find('button[type="submit"]').simulate('click');
      //await component.find('form').simulate('submit');
      component.find('form').simulate('submit', { target: component.find('button[type="submit"]') });
      expect(initProps.login).toHaveBeenCalledTimes(1);
    });
  });

  test('Login Failed', () => {
    act(async () => {
      component.find('input[name="username"]').simulate('change', {target : { value: 'test' } });
      component.find('input[name="password"]').simulate('change', {target : { value: 'abc' } });
      component.find('button[type="submit"]').simulate('click');
      component.find('form').simulate('submit');
      expect(component.find('div.alert.alert-danger.show')).toHaveLength(1);
    });
  });
});
