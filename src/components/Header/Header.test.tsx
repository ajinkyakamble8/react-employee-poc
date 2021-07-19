import React from 'react';
import { mount, shallow } from 'enzyme';
import Header from './Header';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();
const store = mockStore({
  authentication: {
    loggedIn: false,
    user: { username: 'test' }
  }
});

const initProps = {
  logout: jest.fn()
}

describe('<Header />', () => {
  let component: any;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Header {...initProps} />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('Logo click', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      component.find('h2').simulate('click');
    });
    expect(history.location.pathname).toBe('/');
  });
});
