import React from 'react';
import { shallow } from 'enzyme';
import { employeeConstants } from '../_actions/actions-types';
import { employee } from './employee.reducer';

const initialState = {
    employees: [],
    employee: null
};

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

describe('Employee Reducer', () => {

    test('EMP_LIST_LOAD_SUCCESS', () => {
        const dispatch = {
            type: employeeConstants.EMP_LIST_LOAD_SUCCESS,
            employees: testEmployees
        }
        let res: any = employee(initialState, dispatch);
        expect(res.employees.length).toBe(dispatch.employees.length);
    });

    test('EMP_LIST_LOAD_FAILURE', () => {
        const dispatch = {
            type: employeeConstants.EMP_LIST_LOAD_FAILURE
        }
        let res: any = employee(initialState, dispatch);
        expect(res.employees.length).toBe(0);
    });

    test('EMP_DETAILS_LOAD_SUCCESS', () => {
        const dispatch = {
            type: employeeConstants.EMP_DETAILS_LOAD_SUCCESS,
            employee: {
                _id: '123456',
                empId: '101',
                firstName: 'Test1',
                lastName: 'ltest1',
                designation: 'designation1',
                dateOfJoining: '2021-07-14T00:00:00.000+00:00'
            }
        }
        let res: any = employee(initialState, dispatch);
        expect(res.employee.empId).toBe(dispatch.employee.empId);
        expect(res.employee.designation).toBe(dispatch.employee.designation);
        expect(res.employee.dateOfJoining).toBe(dispatch.employee.dateOfJoining);
    });

    test('EMP_DETAILS_LOAD_FAILURE', () => {
        const dispatch = {
            type: employeeConstants.EMP_DETAILS_LOAD_FAILURE
        }
        let res: any = employee(initialState, dispatch);
        expect(res.employee).toBeFalsy();
    });

    test('EMP_SAVE_SUCCESS', () => {
        const dispatch = {
            type: employeeConstants.EMP_SAVE_SUCCESS,
            employees: testEmployees
        }
        let res: any = employee(initialState, dispatch);
        expect(res.employees.length).toBe(dispatch.employees.length);
        expect(res.employee).toBeFalsy();
    });

    test('EMP_SAVE_FAILURE', () => {
        const dispatch = {
            type: employeeConstants.EMP_SAVE_FAILURE,
            employees: testEmployees
        }
        let res: any = employee(initialState, dispatch);
        expect(res.employees.length).toBe(dispatch.employees.length);
        expect(res.employee).toBeFalsy();
    });

    test('EMP_DELETE_SUCCESS', () => {
        const dispatch = {
            type: employeeConstants.EMP_DELETE_SUCCESS,
            employees:  testEmployees
        }
        let res: any = employee(initialState, dispatch);
        expect(res.employees.length).toBe(dispatch.employees.length);
    });

    test('EMP_DELETE_FAILURE', () => {
        const dispatch = {
            type: employeeConstants.EMP_DELETE_FAILURE
        }
        let res: any = employee(initialState, dispatch);
        expect(res.employees.length).toBeGreaterThan(0);
        expect(res.employee).toBeFalsy();
    });

})