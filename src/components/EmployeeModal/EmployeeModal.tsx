import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './EmployeeModal.module.scss';
import { 
  Modal,
  Button,
  FormControl,
  Row,
  Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { employeeDesignations } from './../../helper/constants';
import { employeeActions } from './../../_actions';

/**
 * Display employee details and modal to add new employee
 * @param props 
 * @returns 
 */
const EmployeeModal = (props: any) => {  
  
  const { register, handleSubmit } = useForm();
  
  const { 
    employeeId, 
    employeeDetails, 
    getEmployee, 
    saveEmployee, 
    close
  } = props;

  // To check for update employee or add new employee
  const employee = employeeDetails ? {
      ...employeeDetails,
      dateOfJoining: employeeDetails.dateOfJoining ? employeeDetails.dateOfJoining.slice(0,10) : ''
    } 
    : {
      empId: '',
      firstName: '',
      lastName: '',
      designation: '',
      dateOfJoining: ''
    };

  const [ selectedDesignation, setSelectedDesignation ] = useState('');

  // Load employee details
  useEffect(() => {
    if (employeeId) {
      getEmployee(employeeId);
    }
  }, [employeeId, getEmployee]);

  // Configure designation options
  const getDesignations = () => (
    employeeDesignations.map((designation: any) => (
      <option key={designation.value} value={designation.value}>{designation.text}</option>
    ))
  )

  // on save details for both Add/Update employee details
  const onSubmit = (data: any) => {
    if (employeeId) {
      for (let key of Object.keys(employee)) {
        if (!data[key]) {
          data[key] = employee[key];
        }
      }
      saveEmployee(data, (employeeId));
    } else {
      saveEmployee(data);
    }
    close();
  } 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={4}>
            <label className='float-right'>Employee ID<span className="required-sign">*</span>: </label>
          </Col>
          <Col md={8}>
            <FormControl {...register("empId")} defaultValue={employee.empId} required={true} />
          </Col>
        </Row>
        <Row className='top-margin'>
          <Col md={4}>
            <label className='float-right'>First name<span className="required-sign">*</span>: </label> 
          </Col>
          <Col md={8}>
            <FormControl {...register("firstName")} defaultValue={employee.firstName} required={true} />
          </Col>
        </Row>
        <Row className='top-margin'>
          <Col md={4}>
            <label className='float-right'>Last name: </label> 
          </Col>
          <Col md={8}>
            <FormControl {...register("lastName")} defaultValue={employee.lastName} />
          </Col>
        </Row>
        <Row className='top-margin'>
          <Col md={4}>
            <label className='float-right'>Designation<span className="required-sign">*</span>: </label> 
          </Col>
          <Col md={8}>
            <FormControl as="select" {...register("designation")} value={selectedDesignation || employee.designation} onChange={(e) => setSelectedDesignation(e.target.value)} required={true} >
              <option value="">Select Designation...</option>
              {getDesignations()}
            </FormControl>
          </Col>
        </Row>
        <Row className='top-margin'>
          <Col md={4}>
            <label className='float-right'>Date Of Joining<span className="required-sign">*</span>: </label> 
          </Col>
          <Col md={8}>
            <FormControl {...register("dateOfJoining")} defaultValue={employee.dateOfJoining} type="date" required={true} />
          </Col>
        </Row>
          
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>Close</Button>
        <Button variant="primary" type="submit">Save changes</Button>
      </Modal.Footer>
    </form>
  );
}; 
const mapState = (state: any) => {
  const { employee } = state;
  return {
    employeeDetails: employee.employee
  };
}

const actionCreators = {
  getEmployee: employeeActions.getEmployee,
  saveEmployee: employeeActions.saveEmployee
}

export default connect(mapState, actionCreators)(EmployeeModal);
