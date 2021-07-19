import React from 'react';
import { mount, shallow } from 'enzyme';
import Menu from './Menu';
import { Button, Nav } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';

describe('<Menu />', () => {
  let component: any;

  beforeEach(() => {
    component = mount(<Menu />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
    expect(component.find(Nav)).toHaveLength(1);
  });

  test('Employees menu click', () => {
    act(async () => {
      const history = {
        push: jest.fn()
      }
      component.find(Button).simulate('click');
      expect(history.push).toHaveBeenCalled();
    });
  });

});
