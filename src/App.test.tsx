import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import Login from './pages/Login/Login.lazy';
import { urlRoutes } from './helper/constants';
import Home from './pages/Home/Home';
import { Redirect } from 'react-router-dom';
import { act } from '@testing-library/react';
import { createMemoryHistory } from 'history';

describe('<App />', () => {
  let component;

  beforeEach(() => {
    component = mount(<App />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('invalid path should redirect Login page', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={[ '/random' ]}>
          <App/>
        </MemoryRouter>
      );
    });
    expect(history.location.pathname).toBe('/');
  });

  test('Home page path should redirect to Home page after login', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(Login)).toHaveLength(1);
  });
});
