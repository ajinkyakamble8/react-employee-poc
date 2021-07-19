import React from 'react';
import { shallow } from 'enzyme';
import { notificationActions } from './notification.action';
import { notificationActionType } from './actions-types';

describe('Notification Actions', () => {
  let dispatch = jest.fn()

  test('trigger notifySuccess', () => {
    notificationActions.notifySuccess('Saved Successfully!')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_SUCCESS, 
      notifyMessage: 'Saved Successfully!'
    });
  });

  test('trigger notifyFailure', () => {
    notificationActions.notifyFailure('Failed To Saved!')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.NOTIFY_FAILURE, 
      notifyMessage: 'Failed To Saved!'
    });
  });

  test('trigger closeNotification', () => {
    notificationActions.closeNotification()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: notificationActionType.CLOSE_NOTIFY
    });
  });

})