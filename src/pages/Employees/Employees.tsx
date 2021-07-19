import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './Employees.module.scss';
import { 
  Table, 
  Card,
  Button,
  Modal } from 'react-bootstrap';
import EmployeeModal from '../../components/EmployeeModal/EmployeeModal';
import EmployeeRow from '../../components/EmployeeRow/EmployeeRow';
import { employeeActions } from '../../_actions';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

/**
 * Employee list page
 * @param props 
 * @returns 
 */
const Employees = (props: any) => {

  const { 
    employees, 
    getEmployees, 
    deleteEmployee
  } = props;

  const [ onEdit, setOnEdit ] = useState(false);
  const [ selectedEmployee, setSelectedEmployee ] = useState(null);
  const [ deleteConfirmation, setDeleteConfirmation ] = useState(false);
  const [ deleteEmployeeId, setDeleteEmployeeId ] = useState('');

  // Load employee list
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  // On employee detail modal close
  const onEditClose = () => {
    setOnEdit(false);
  } 
  
  // On Add/Update employee detail modal open
  const onAddEditShow = (id: any) => {
    setSelectedEmployee(id);
    setOnEdit(true);
  } 

  // To show confirmation modal on delete action
  const onDeleteEmployee = (id: any) => {
    setDeleteEmployeeId(id);
    setDeleteConfirmation(true);
  } 

  // To delete employee details
  const onDeleteConfirmation = (id: any) => {
    if (id) {
      deleteEmployee(id) 
    }
    setDeleteConfirmation(false);
  }

  // Get employee rows to display
  const getEmployeesData = () => {
    if (employees && employees.length > 0) {
      return employees.map((employee: any) => 
        <EmployeeRow key={employee._id} employee={employee} onEdit={onAddEditShow} onDelete={() => onDeleteEmployee(employee._id)} />
      );
    } else {
      return <tr><td colSpan={5}>No Record Fond</td></tr>
    }
    
  } 
  
  return (
    <>
      <Card body className={styles.Employees}>
        <h4>Employee List</h4>
        <Button size="sm" id='btnAddEmployee' className={styles.addEmployeeBtn} onClick={() => onAddEditShow(null)}>+ Add Employee</Button>
        <br />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Emp Id</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Date of Joining</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getEmployeesData()}
          </tbody>
        </Table>
      </Card>
      <Modal show={onEdit} onHide={onEditClose}>
        <EmployeeModal employeeId={selectedEmployee} close={onEditClose} />
      </Modal>
      <ConfirmationModal
        showModal={deleteConfirmation}
        hideModal={() => setDeleteConfirmation(false)}
        onConfirm={onDeleteConfirmation}
        action="Delete"
        id={deleteEmployeeId}
        message="Are you sure you want to delete?"
      />
    </>
  );
};

const mapState = (state: any) => {
  const { employee } = state;
  return {
    employees: employee.employees
  };
}

const actionCreators = {
  getEmployees: employeeActions.getEmployees,
  deleteEmployee: employeeActions.deleteEmployee
}

export default connect(mapState, actionCreators)(Employees);
