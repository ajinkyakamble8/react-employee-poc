import { employeeConstants, notificationActionType } from './actions-types';
import employeeServices from './../services/employee.service';

export const employeeActions = {
    getEmployees,
    getEmployee,
    saveEmployee,
    deleteEmployee
};

/**
 * Get employee list
 * @returns 
 */
function getEmployees() {
    return async (dispatch: any) => {
        try {
            const employees = await employeeServices.getEmployees();
            if (employees) {
                dispatch({ type: employeeConstants.EMP_LIST_LOAD_SUCCESS, employees });
            } else {
                dispatch({ type: employeeConstants.EMP_LIST_LOAD_SUCCESS, employees: [] });
            }
        } catch (error) {
            dispatch({ type: employeeConstants.EMP_LIST_LOAD_FAILURE });
            dispatch({ type: notificationActionType.NOTIFY_FAILURE, notifyMessage: 'Faild To Fetch Employees!' });
        }
    };
}

/**
 * Get employee details
 * @param id pass employee id
 * @returns 
 */
function getEmployee(id: any) {
    return async (dispatch: any) => {
        try {
            const employee = await employeeServices.getEmployee(id);
            if (employee) {
                dispatch({ type: employeeConstants.EMP_DETAILS_LOAD_SUCCESS, employee });
            } else {
                dispatch({ type: employeeConstants.EMP_DETAILS_LOAD_FAILURE });
                dispatch({ type: notificationActionType.NOTIFY_FAILURE, notifyMessage: 'Faild To Fetch Employee Data!' });
            }
        } catch (error) {
            dispatch({ type: employeeConstants.EMP_DETAILS_LOAD_FAILURE });
            dispatch({ type: notificationActionType.NOTIFY_FAILURE, notifyMessage: 'Faild To Fetch Employee Data!' });
        }
    };
}

/**
 * Add/Update employee details
 * @param employee pass employee details
 * @param id pass employee id if you want to update employee details else it will add it as new employee
 * @returns 
 */
function saveEmployee(employee: any, id: any = null) {
    return async (dispatch: any) => {
        try {
            let emp = null;
            if (id) {
                emp = await employeeServices.updateEmployee(employee, id);
            } else {
                emp = await employeeServices.addEmployee(employee);
            }

            // If employee saved successfully, get updated employee list
            if (emp) {
                const employees = await employeeServices.getEmployees();
                dispatch({ type: employeeConstants.EMP_SAVE_SUCCESS, employees, employee: emp });
                dispatch({ type: notificationActionType.NOTIFY_SUCCESS, notifyMessage: 'Saved Successfully!' });
            } else {
                dispatch({ type: employeeConstants.EMP_SAVE_FAILURE });
                dispatch({ type: notificationActionType.NOTIFY_FAILURE, notifyMessage: 'Faild To Save!' });
            }    
        } catch (error) {
            dispatch({ type: employeeConstants.EMP_SAVE_FAILURE });
            dispatch({ type: notificationActionType.NOTIFY_FAILURE, notifyMessage: 'Faild To Save!' });
        }
    };
}

/**
 * To delete employee details
 * @param id pass employee id to delete
 * @returns 
 */
function deleteEmployee(id: any) {
    return async (dispatch: any) => {
        try {
            const res = await employeeServices.deleteEmployee(id);
            if (res) {
                const employees = await employeeServices.getEmployees();
                dispatch({ type: employeeConstants.EMP_DELETE_SUCCESS, employees });
                dispatch({ type: notificationActionType.NOTIFY_SUCCESS, notifyMessage: 'Deleted Successfully!' });
            } else {
                dispatch({ type: employeeConstants.EMP_DELETE_FAILURE });
                dispatch({ type: notificationActionType.NOTIFY_FAILURE, notifyMessage: 'Faild To Delete!' });
            }
        } catch (error) {
            dispatch({ type: employeeConstants.EMP_DELETE_FAILURE });
            dispatch({ type: notificationActionType.NOTIFY_FAILURE, notifyMessage: 'Faild To Delete!' });
        }
    };
}