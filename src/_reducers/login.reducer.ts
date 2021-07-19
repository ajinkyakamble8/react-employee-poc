import { loginConstants } from '../_actions/actions-types';
import { getToken, parseToken } from '../helper/common';

// If user is already logged in make that as initial state
let user = parseToken(window.sessionStorage.getItem("userToken") || '');
const initialState = user ? { loggedIn: true, user } : {};

/**
 * Update store for login actions
 * @param state pass current state
 * @param action pass action type and payload
 * @returns 
 */
export function authentication(state = initialState, action: any) {
  switch (action.type) {
    case loginConstants.LOGIN_SUCCESS:
      window.sessionStorage.setItem("userToken", getToken(action.user?.username + '_' + action.user?.password));
      return {
        loggedIn: true,
        user: { username: action.user?.username }
      };
    case loginConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
      };
    case loginConstants.LOGOUT_SUCCESS:
      window.sessionStorage.getItem("userToken") && window.sessionStorage.removeItem("userToken");
      return {};
    default:
      return state
  }
}