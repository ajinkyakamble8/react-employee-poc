import React from 'react';
import { shallow } from 'enzyme';
import { loginConstants } from '../_actions/actions-types';
import { authentication } from './login.reducer';

let initialState = { 
    loggedIn: true, 
    user: { 
        username: '' 
    }
}

describe('Login Reducer', () => {

    test('LOGIN_SUCCESS', () => {
        const dispatch = {
            type: loginConstants.LOGIN_SUCCESS,
            user: { username: 'test' }
        }
        let res: any = authentication(initialState, dispatch);
        expect(window.sessionStorage.getItem("userToken")).toBeTruthy();
        expect(res.loggedIn).toBeTruthy();
        expect(res.user.username).toBe(dispatch.user.username);
    });

    test('LOGIN_FAILURE', () => {
        const dispatch = {
            type: loginConstants.LOGIN_FAILURE
        }
        let res: any = authentication(initialState, dispatch);
        expect(res.loggedIn).toBeFalsy();
    });

    test('LOGOUT_SUCCESS', () => {
        const dispatch = {
            type: loginConstants.LOGOUT_SUCCESS
        }
        let res: any = authentication(initialState, dispatch);
        expect(window.sessionStorage.getItem("userToken")).toBeFalsy();
        expect(res.loggedIn).toBeFalsy();
        expect(res.user).toBeFalsy();
    });

})