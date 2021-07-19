import React from 'react';
import styles from './EmployeeRow.module.scss';
import moment from 'moment';
import {
  Button
} from 'react-bootstrap';

/**
 * Employee row
 * @param param0 
 * @returns 
 */
const EmployeeRow = ({ employee, onEdit, onDelete }: any) => {

  if (!employee) {
    employee = {
      _id: null,
      empId: '',
      firstName: '',
      lastName: '',
      designation: '',
      dateOfJoining: ''
    }
  }
  
  return (
    <tr>
      <td>{employee.empId}</td>
      <td>{`${employee.firstName} ${employee.lastName}`}</td>
      <td>{employee.designation}</td>
      <td>{moment(employee.dateOfJoining).format('MM/DD/yyyy')}</td>
      <td>
        <Button size="sm" onClick={() => onEdit(employee._id)}>Edit</Button>&nbsp;&nbsp;
        <Button variant="secondary" size="sm" onClick={() => onDelete(employee._id)}>Delete</Button>
      </td>
    </tr> 
  );
}

export default EmployeeRow;
