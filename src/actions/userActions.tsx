import { Dispatch } from 'redux';
import * as api from '../api'
import { AppState } from '../states/appState';
import { User } from '../model';
import { MessageLogAction, postMessage } from "./messageLogActions";
import { ChangeDrawer, changeDrawer } from "./dashboardActions";



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LOGOUT_USER = 'LOGOUT_USER';
export type LOGOUT_USER = typeof LOGOUT_USER;

export interface LogoutUser {
    type: LOGOUT_USER;
}

function _logoutUser(): LogoutUser {
    return {type: LOGOUT_USER};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function logoutUser() {
    return (dispatch: Dispatch<LogoutUser | ChangeDrawer | MessageLogAction>, getState: () => AppState) => {
        dispatch(changeDrawer("Search"));
        api.logoutUser(getState().configState.apiServerUrl)
            .then(() => {
                dispatch(_logoutUser())
            })
            .then(() => {
                dispatch(postMessage('success', 'Logout successful'));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function changeLoginUser(username: string, oldPassword: string, newPassword1: string, newPassword2: string) {
    return (dispatch: Dispatch<LogoutUser | ChangeDrawer | MessageLogAction>, getState: () => AppState) => {
        const state = getState();

        api.changeLoginUser(state.configState.apiServerUrl, username, oldPassword, newPassword1, newPassword2)
            .then(() => {
                dispatch(postMessage('success', 'Password Changed'));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}



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

export type UserAction = LoginUser | LogoutUser | StartUserLogin;
