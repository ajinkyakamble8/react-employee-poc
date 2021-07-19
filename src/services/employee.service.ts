import axios from 'axios';
import { baseAPI, apiURLs } from '../helper/constants';

const employeeServices = {
    getEmployees,
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
}

export default employeeServices;

/**
 * Get employee list
 */
function getEmployees() {
    return new Promise( async (resolve: any, reject: any) => {
        try {
            const emps: any = await axios.get(`${baseAPI}${apiURLs.EMPLOYEE}`);
            if (emps && emps.data) {
                resolve(emps.data);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * get employee details for give employee id
 * @param id employee id to fetch employee details
 * @returns 
 */
function getEmployee(id: any) {
    return new Promise( async (resolve: any, reject: any) => {
        try {
            const emps: any = await axios.get(`${baseAPI}${apiURLs.EMPLOYEE}/${id}`);
            if (emps && emps.data) {
                resolve(emps.data);
            } else {
                reject("Something Went Wrong...");
            }
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Add new employee
 * @param employee pass employee details to save
 * @returns 
 */
function addEmployee(employee: any) {
    return new Promise( async (resolve: any, reject: any) => {
        try {
            const emps: any = await axios.post(`${baseAPI}${apiURLs.EMPLOYEE}`, employee)
            if (emps && emps.data) {
                resolve(emps.data);
            } else {
                reject("Something Went Wrong...");
            }
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Update employee details
 * @param employee pass updated values for employee
 * @param id pass employee id to update details
 * @returns 
 */
function updateEmployee(employee: any, id: any) {
    return new Promise( async (resolve: any, reject: any) => {
        try {
            const emps: any = await axios.put(`${baseAPI}${apiURLs.EMPLOYEE}/${id}`, employee)
            if (emps && emps.data) {
                resolve(emps.data);
            } else {
                reject("Something Went Wrong...");
            }
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * delete employee details
 * @param id pass employee id to delete employee
 * @returns 
 */
function deleteEmployee(id: any) {
    return new Promise( async (resolve: any, reject: any) => {
        try {
            const emps: any = await axios.delete(`${baseAPI}${apiURLs.EMPLOYEE}/${id}`)
            if (emps && emps.data) {
                resolve(emps.data);
            } else {
                reject("Something Went Wrong...");
            }
        } catch (error) {
            reject(error);
        }
    });
}