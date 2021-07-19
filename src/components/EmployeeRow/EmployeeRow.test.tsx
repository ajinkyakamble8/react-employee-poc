import React from 'react';
import { shallow } from 'enzyme';
import EmployeeRow from './EmployeeRow';
import { act } from '@testing-library/react';
import { Button } from 'react-bootstrap';

const initProps = {
  employee: {
    _id: '123456',
    empId: '101',
    firstName: 'test1',
    lastName: 'test1',
    designation: 'designation1',
    dateOfJoining: '2021-07-14T00:00:00.000+00:00'
  },
  onEdit: jest.fn(),
  onDelete: jest.fn()
}

describe('<EmployeeRow />', () => {
  let component: any;
  beforeEach(() => {
    component = shallow(
      <EmployeeRow {...initProps} />
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should mount with empty employee details', () => {
    component = shallow(
      <EmployeeRow {...initProps} employee={null} />
    );
    expect(component.length).toBe(1);
  });

  test('on Edit click', () => {
    act(async () => {
      component.find(Button).at(0).simulate('click');
      expect(initProps.onEdit).toHaveBeenCalled();
    });
  });

  test('on Delete click', () => {
    act(async () => {
      component.find(Button).at(1).simulate('click');
      expect(initProps.onDelete).toHaveBeenCalled();
    });
  });

});
