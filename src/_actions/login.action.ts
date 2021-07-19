import { userAccess, urlRoutes } from '../helper/constants';
import { history } from '../helper/common';
import { loginConstants } from './actions-types'

export const loginActions = {
    login,
    logout
};

/**
 * Verify if user is authenticated or not
 * @param username pass username
 * @param password pass password
 * @returns 
 */
function login(username: string, password: string) {
    return (dispatch: any) => {
        
        if (username && username === userAccess.username
            && password && password === userAccess.password) {
            dispatch({ 
                type: loginConstants.LOGIN_SUCCESS, 
                user: { 
                    username: username, 
                    password: password 
                } 
            });
            history.push(urlRoutes.HOME);
          } else {
            dispatch({ type: loginConstants.LOGIN_FAILURE });
          }
    };
}

/**
 * Trigger on user logout.
 * @returns 
 */
function logout() {
    return (dispatch: any) => {
        dispatch({ type: loginConstants.LOGOUT_SUCCESS });
        history.push(urlRoutes.LOGIN);
    }
}