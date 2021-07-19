import { notificationActionType } from '../_actions/actions-types';

const initialState = { 
    isSuccess: false,
    isFailure: false,
    message: '',
    delay: 0
};

/**
 * Update store values for notification details
 * @param state pass current state
 * @param action pass action type with payload
 * @returns 
 */
export function notification(state = initialState, action: any) {
  switch (action.type) {
    case notificationActionType.NOTIFY_SUCCESS:
      return {
        isSuccess: true,
        isFailure: false,
        message: action.notifyMessage,
      };
    case notificationActionType.NOTIFY_FAILURE:
      return {
        isSuccess: false,
        isFailure: true,
        message: action.notifyMessage
      };
    case notificationActionType.CLOSE_NOTIFY:
      return { ...initialState };
    default:
      return { ...state }
  }
}