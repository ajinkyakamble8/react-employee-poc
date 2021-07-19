import React from 'react';
import { mount, shallow } from 'enzyme';
import EmployeeModal from './EmployeeModal';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import { act } from 'react-dom/test-utils';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  employee: {
    employee: {
      _id: '123456',
      empId: '101',
      firstName: 'Test1',
      lastName: 'ltest1',
      designation: 'Jr Software Engg',
      dateOfJoining: '2021-07-14T00:00:00.000+00:00'
    }
  }
});

const initProps = {
  employeeId: '123456',
  getEmployee: jest.fn(),
  saveEmployee: jest.fn(),
  close: jest.fn()
}

describe('<EmployeeModal />', () => {
  let component: any;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <EmployeeModal {...initProps} />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('Save updated data', () => {
    act(async () => {
      component.find('select[name="designation"]').simulate('change', { target: { value: 'Trainee' }});
      component.find('button[type="submit"]').simulate('click');
      component.find('form').simulate('submit');
      expect(initProps.saveEmployee).toHaveBeenCalledTimes(1);
      expect(initProps.close).toHaveBeenCalledTimes(1);
    });
  });

  test('Add new employee', () => {
    act(async () => {
      const store1 = mockStore({
        employee: {
          employee: null
        }
      });
      component = mount(
        <Provider store={store1}>
          <EmployeeModal {...initProps} employeeId={null} />
        </Provider>
      );
      component.find('input[name="empId"]').simulate('change', { target: {value: '102' }})
      component.find('input[name="firstName"]').simulate('change', { target: {value: 'Test1' }})
      component.find('input[name="lastName"]').simulate('change', { target: {value: 'lTest2' }})
      component.find('select[name="designation"]').simulate('change', { target: {value: 'Trainee' }})
      component.find('input[name="dateOfJoining"]').simulate('change', { target: {value: '2021-07-14' }})
      component.find('button[type="submit"]').simulate('click');
      component.find('form').simulate('submit');
      expect(initProps.saveEmployee).toHaveBeenCalledTimes(1);
      expect(initProps.close).toHaveBeenCalledTimes(1);
    });
  });

});
