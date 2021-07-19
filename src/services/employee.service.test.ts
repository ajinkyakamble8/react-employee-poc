import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import employeeServices from './employee.service';
import { apiURLs, baseAPI } from '../helper/constants';

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

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Employee Services', () => {

    test('getEmployees success', async () => {
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: testEmployees}));
        const res: any = await employeeServices.getEmployees();
        await expect(res.length).toBe(2);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseAPI}${apiURLs.EMPLOYEE}`);
    });

    test('getEmployees return empty list', async () => {
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
        const res: any = await employeeServices.getEmployees();
        await expect(res.length).toBe(0);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseAPI}${apiURLs.EMPLOYEE}`);
    });

    test('getEmployees failure', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
        await expect(employeeServices.getEmployees()).rejects.toThrow(errorMessage);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseAPI}${apiURLs.EMPLOYEE}`);
    });

    test('getEmployee success', async () => {
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: testEmployees[0]}));
        const res: any = await employeeServices.getEmployee(123456);
        await expect(res).toBe(testEmployees[0]);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseAPI}${apiURLs.EMPLOYEE}/123456`);
    });

    test('getEmployee failure', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
        await expect(employeeServices.getEmployee(123456)).rejects.toThrow(errorMessage);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseAPI}${apiURLs.EMPLOYEE}/123456`);
    });

    test('addEmployee success', async () => {
        mockedAxios.post.mockImplementationOnce(() => Promise.resolve({data: testEmployees[0]}));
        const res: any = await employeeServices.addEmployee(testEmployees[0]);
        await expect(res).toBe(testEmployees[0]);
        expect(mockedAxios.post).toHaveBeenCalled();
    });

    test('addEmployee failure', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.post.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
        await expect(employeeServices.addEmployee(testEmployees[0])).rejects.toThrow(errorMessage);
        expect(mockedAxios.post).toHaveBeenCalled();
    });

    test('updateEmployee success', async () => {
        mockedAxios.put.mockImplementationOnce(() => Promise.resolve({data: testEmployees[0]}));
        const res: any = await employeeServices.updateEmployee(testEmployees[0], 123456);
        await expect(res).toBe(testEmployees[0]);
        expect(mockedAxios.put).toHaveBeenCalled();
    });

    test('updateEmployee failure', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.put.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
        await expect(employeeServices.updateEmployee(testEmployees[0], 123456)).rejects.toThrow(errorMessage);
        expect(mockedAxios.put).toHaveBeenCalled();
    });

    test('deleteEmployee success', async () => {
        mockedAxios.delete.mockImplementationOnce(() => Promise.resolve({data: testEmployees[0]}));
        const res: any = await employeeServices.deleteEmployee(123456);
        await expect(res).toBe(testEmployees[0]);
        expect(mockedAxios.delete).toHaveBeenCalledWith(`${baseAPI}${apiURLs.EMPLOYEE}/123456`);
    });

    test('deleteEmployee failure', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.delete.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
        await expect(employeeServices.deleteEmployee(123456)).rejects.toThrow(errorMessage);
        expect(mockedAxios.delete).toHaveBeenCalledWith(`${baseAPI}${apiURLs.EMPLOYEE}/123456`);
    });

})