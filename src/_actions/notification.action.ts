import { notificationActionType } from './actions-types'

export const notificationActions = {
    notifySuccess,
    notifyFailure,
    closeNotification
};

/**
 * dispatch on success notification
 * @param message message to display on success.
 * @returns 
 */
function notifySuccess(message: string) {
    return (dispatch: any) => {
        dispatch({ type: notificationActionType.NOTIFY_SUCCESS, notifyMessage: message });
    }
}

/**
 * dispatch on failure notification
 * @param message message to display on failure.
 * @returns 
 */
function notifyFailure(message: string) {
    return (dispatch: any) => {
        dispatch({ type: notificationActionType.NOTIFY_FAILURE, notifyMessage: message });
    }
}

/**
 * dispatch on notification close to reset current state
 * @returns 
 */
function closeNotification() {
    return (dispatch: any) => {
        dispatch({ type: notificationActionType.CLOSE_NOTIFY });
    }
}