import React from 'react';
import { shallow } from 'enzyme';
import { employeeConstants, notificationActionType } from './actions-types';
import { employeeActions } from './employee.action';
import { act } from 'react-dom/test-utils';
import employeeServices from '../services/employee.service';


const testEmployees = [
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

jest.mock('../services/employee.service');
const mockedServices = employeeServices as jest.Mocked<typeof employeeServices>

describe('Employee Actions', () => {
  let dispatch = jest.fn()

  test('trigger getEmployees load success', async () => {
    mockedServices.getEmployees.mockImplementationOnce(() => Promise.resolve(testEmployees));
    await employeeActions.getEmployees()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_LIST_LOAD_SUCCESS,
      employees: testEmployees
    });
  });

  test('trigger getEmployees load success for empty list', async () => {
    mockedServices.getEmployees.mockImplementationOnce(() => Promise.resolve(null));
    await employeeActions.getEmployees()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_LIST_LOAD_SUCCESS,
      employees: []
    });
  });

  test('trigger getEmployees load failure', async () => {
    const errorMessage = 'Network Error';
    mockedServices.getEmployees.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    await employeeActions.getEmployees()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_LIST_LOAD_FAILURE
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_FAILURE,
      notifyMessage: 'Faild To Fetch Employees!'
    });
  })

  test('trigger getEmployee details load success', async () => {
    mockedServices.getEmployee.mockImplementationOnce(() => Promise.resolve(testEmployees[0]));
    await employeeActions.getEmployee(123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_DETAILS_LOAD_SUCCESS,
      employee: testEmployees[0]
    });
  });

  test('trigger getEmployee employee not found', async () => {
    mockedServices.getEmployee.mockImplementationOnce(() => Promise.resolve(null));
    await employeeActions.getEmployee(123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_DETAILS_LOAD_FAILURE
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_FAILURE,
      notifyMessage: 'Faild To Fetch Employee Data!'
    });
  });

  test('trigger getEmployee failure', async () => {
    const errorMessage = 'Network Error';
    mockedServices.getEmployee.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    await employeeActions.getEmployee(123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_DETAILS_LOAD_FAILURE
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_FAILURE,
      notifyMessage: 'Faild To Fetch Employee Data!'
    });
  });

  test('trigger saveEmployee success for new employee', async () => {
    mockedServices.addEmployee.mockImplementationOnce(() => Promise.resolve(testEmployees[0]));
    mockedServices.getEmployees.mockImplementationOnce(() => Promise.resolve(testEmployees));
    await employeeActions.saveEmployee(testEmployees[0])(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_SAVE_SUCCESS,
      employees: testEmployees,
      employee: testEmployees[0]
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_SUCCESS,
      notifyMessage: 'Saved Successfully!'
    });
  });

  test('trigger saveEmployee success for update employee', async () => {
    mockedServices.updateEmployee.mockImplementationOnce(() => Promise.resolve(testEmployees[0]));
    mockedServices.getEmployees.mockImplementationOnce(() => Promise.resolve(testEmployees));
    await employeeActions.saveEmployee(testEmployees[0], 123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_SAVE_SUCCESS,
      employees: testEmployees,
      employee: testEmployees[0]
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_SUCCESS,
      notifyMessage: 'Saved Successfully!'
    });
  });

  test('trigger saveEmployee for update employee, employee not found', async () => {
    mockedServices.updateEmployee.mockImplementationOnce(() => Promise.resolve(null));
    mockedServices.getEmployees.mockImplementationOnce(() => Promise.resolve(testEmployees));
    await employeeActions.saveEmployee(testEmployees[0], 123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_SAVE_FAILURE
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_FAILURE,
      notifyMessage: 'Faild To Save!'
    });
  });

  test('trigger saveEmployee for update employee, failure woth exception', async () => {
    const errorMessage = 'Network Error';
    mockedServices.updateEmployee.mockImplementationOnce(() => Promise.reject(errorMessage));
    mockedServices.getEmployees.mockImplementationOnce(() => Promise.resolve(testEmployees));
    await employeeActions.saveEmployee(testEmployees[0], 123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_SAVE_FAILURE
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_FAILURE,
      notifyMessage: 'Faild To Save!'
    });
  });

  test('trigger deleteEmployee success', async () => {
    mockedServices.deleteEmployee.mockImplementationOnce(() => Promise.resolve(testEmployees[0]));
    mockedServices.getEmployees.mockImplementationOnce(() => Promise.resolve(testEmployees));
    await employeeActions.deleteEmployee(123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_DELETE_SUCCESS,
      employees: testEmployees
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_SUCCESS,
      notifyMessage: 'Deleted Successfully!'
    });
  });

  test('trigger deleteEmployee, employee not found', async () => {
    mockedServices.deleteEmployee.mockImplementationOnce(() => Promise.resolve(null));
    await employeeActions.deleteEmployee(123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_DELETE_FAILURE
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_FAILURE,
      notifyMessage: 'Faild To Delete!'
    });
  });

  test('trigger deleteEmployee, failure woth exception', async () => {
    const errorMessage = 'Network Error';
    mockedServices.deleteEmployee.mockImplementationOnce(() => Promise.reject(errorMessage));
    await employeeActions.deleteEmployee(123456)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: employeeConstants.EMP_DELETE_FAILURE
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_FAILURE,
      notifyMessage: 'Faild To Delete!'
    });
  });

})