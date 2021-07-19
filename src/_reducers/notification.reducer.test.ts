import React from 'react';
import { shallow } from 'enzyme';
import { notification } from './notification.reducer';
import { notificationActionType } from '../_actions/actions-types';

const initialState = { 
  isSuccess: false,
  isFailure: false,
  message: '',
  delay: 0
};

describe('Notification Reducer', () => {
  
  test('It should notify NOTIFY_SUCCESS', () => {
    const dispatch = {
      type: notificationActionType.NOTIFY_SUCCESS,
      notifyMessage: "Saved Successfully!"
    }
    let res = notification(initialState, dispatch);
    expect(res.isSuccess).toBeTruthy();
    expect(res.isFailure).toBeFalsy();
    expect(res.message).toBe(dispatch.notifyMessage);
  });

  test('It should notify NOTIFY_FAILURE', () => {
    const dispatch = {
      type: notificationActionType.NOTIFY_FAILURE,
      notifyMessage: "Failed To Save!"
    }
    let res = notification(initialState, dispatch);
    expect(res.isSuccess).toBeFalsy();
    expect(res.isFailure).toBeTruthy();
    expect(res.message).toBe(dispatch.notifyMessage);
  });

  test('It should notify CLOSE_NOTIFY', () => {
    const dispatch = {
      type: notificationActionType.CLOSE_NOTIFY
    }
    let res = notification(initialState, dispatch);
    expect(res.isSuccess).toBeFalsy();
    expect(res.isFailure).toBeFalsy();
    expect(res.message).toBe('');
  });

})