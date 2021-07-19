import React from 'react';
import { mount, shallow } from 'enzyme';
import Notify from './Notify';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  notification: {
    isSuccess: true,
    isFailure: false,
    message: 'Saved Successfully!'
  }
});

const initProps = {
  close: jest.fn()
}

describe('<Notify />', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Notify {...initProps} />
      </Provider>
    );
  });

  test('It should mount for success', () => {
    expect(component.length).toBe(1);
  });

  test('It should mount for failure', () => {
    const store1 = mockStore({
      notification: {
        isSuccess: false,
        isFailure: true,
        message: 'Failed To Saved!'
      }
    });
    component = mount(
      <Provider store={store1}>
        <Notify {...initProps} />
      </Provider>
    );
    expect(component.length).toBe(1);
  });
});
