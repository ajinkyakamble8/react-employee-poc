import { employeeConstants } from '../_actions/actions-types';

const initialState = {
    employees: [],
    employee: null
};

/**
 * Update store for employee details/list
 * @param state pass current state
 * @param action pass action type and payload
 * @returns 
 */
export function employee(state = initialState, action: any) {
  switch (action.type) {

    case employeeConstants.EMP_LIST_LOAD_SUCCESS:
      state.employees = action.employees;
    break;

    case employeeConstants.EMP_LIST_LOAD_FAILURE:
      state.employees = [];
    break;

    case employeeConstants.EMP_DETAILS_LOAD_SUCCESS:
      state.employee = action.employee;
    break;

    case employeeConstants.EMP_DETAILS_LOAD_FAILURE:
      state.employee = null;
    break;

    case employeeConstants.EMP_SAVE_SUCCESS:
      state.employees = action.employees;
      state.employee = null;
    break;

    case employeeConstants.EMP_SAVE_FAILURE:
      state.employees = action.employees;
      state.employee = null;
    break;
    
    case employeeConstants.EMP_DELETE_SUCCESS:
      state.employees = action.employees;
    break;

    case employeeConstants.EMP_DELETE_FAILURE:
    break;
    
  }

  return {...state}
}