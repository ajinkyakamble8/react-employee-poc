import React from 'react';
import { connect } from 'react-redux';
import styles from './Notify.module.scss';
import {
  Toast
} from 'react-bootstrap';

import { notificationActions } from './../../_actions/notification.action';

/**
 * Notifications to display success/failure messages.
 * @param props 
 * @returns 
 */
const Notify = (props: any) => {

  const { 
    isSuccess,
    isFailure,
    message,
    close
  } = props;
  
  return (
    message ?
    <Toast 
      onClose={close} 
      show={isSuccess || isFailure} 
      delay={3000} 
      autohide
      className={styles.notification}
      style={{
        backgroundColor: isSuccess ? 'green' : (isFailure ? 'red' : 'inherit')
      }}
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
    : <></>
  );
}

const mapState = (state: any) => {
  const { notification } = state;
  return { ...notification };
}

const actionCreators = {
  close: notificationActions.closeNotification
}

export default connect(mapState, actionCreators)(Notify);
