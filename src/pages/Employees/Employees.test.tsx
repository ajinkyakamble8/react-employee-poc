import React from 'react';
import { shallow, mount } from 'enzyme';
import Employees from './Employees';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import { act } from 'react-dom/test-utils';
import EmployeeRow from '../../components/EmployeeRow/EmployeeRow';
import EmployeeModal from '../../components/EmployeeModal/EmployeeModal';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { Modal } from 'react-bootstrap';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  employee : {
    employees: [
      {
        _id: '123456',
        empId: '101',
        firstName: 'Test1',
        lastName: 'ltest1',
        designation: 'designation1',
        dateOfJoining: '2021-07-14T00:00:00.000+00:00'
      },
      {
        _id: '654321',
        empId: '102',
        firstName: 'Test2',
        lastName: 'ltest2',
        designation: 'designation2',
        dateOfJoining: '2021-07-15T00:00:00.000+00:00'
      }
    ] 
  }
});

const initProps = {
  getEmployees: jest.fn(),
  deleteEmployee: jest.fn()
}

describe('<Employee />', () => {
  let component: any;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Employees {...initProps} />
      </Provider>
    );
  });

  test('It should mount', () => {
    act(async () => {
      expect(component.length).toBe(1);
    });
  });

  test('Should load employee list', () => {
    act(async () => {
      expect(EmployeeRow).toHaveLength(2);
    });
  });

  test('Empployee List is empty', () => {
    act(async () => {
      const store1 = mockStore({
        employee : { employees: [] }
      });
      component = mount(
        <Provider store={store1}>
          <Employees {...initProps} />
        </Provider>
      );

      expect(component.find(<tr><td colSpan={5}>No Record Fond</td></tr>)).toHaveLength(1);
    });
  });

  test('Add new employee', () => {
    act(async () => {
      const setOnEdit = jest.fn();
      component.find('#btnAddEmployee').simulate('click');
      expect(setOnEdit).toHaveBeenCalledWith(true);
    });
  });

  test('On delete new employee', async () => {
    await act(async () => {
      component.find("button[type='button'].btn-secondary").at(0).simulate('click')
    });
    expect(component.find(ConfirmationModal)).toHaveLength(1);
  });

  test('On Edit employee', () => {
    act(async () => {
      const setOnEdit = jest.fn();
      component.find("button[type='button'].btn-primary").at(1).simulate('click')
      expect(setOnEdit).toHaveBeenCalledWith(true);
    });
  });

});
