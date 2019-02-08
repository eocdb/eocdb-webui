import { Dispatch } from 'redux';
import * as api from '../api'
import { AppState } from '../states/appState';
import { User } from '../types/user';
import { MessageLogAction, postMessage } from "./messageLogActions";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function loginUser(name: string, password: string) {
    return (dispatch: Dispatch<LoginUser | StartUserLogin | MessageLogAction>, getState: () => AppState) => {
        dispatch(_startUserLogin());
        api.loginUser(getState().configState.apiServerUrl, name, password)
           .then((user: User) => {
               dispatch(_loginUser(user, null));
           })
           .then(() => {
                dispatch(postMessage('success', 'Login successful'));
           })
           .catch((error: string) => {
               dispatch(_loginUser(null, `${error}`));
               dispatch(postMessage('error', error + ''));
           });
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const START_USER_LOGIN = 'START_USER_LOGIN';
export type START_USER_LOGIN = typeof START_USER_LOGIN;

export interface StartUserLogin {
    type: START_USER_LOGIN;
}

function _startUserLogin(): StartUserLogin {
    return {type: START_USER_LOGIN};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LOGIN_USER = 'LOGIN_USER';
export type LOGIN_USER = typeof LOGIN_USER;

export interface LoginUser {
    type: LOGIN_USER;
    user: User | null;
    userLoginError: string | null;
}

function _loginUser(user: User | null, userLoginError: string | null): LoginUser {
    return {type: LOGIN_USER, user, userLoginError};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type UserAction = LoginUser | StartUserLogin;
