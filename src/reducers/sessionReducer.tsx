import { LOGIN_USER, LOGOUT_USER, START_USER_LOGIN, UPDATE_SETTINGS, UserAction } from '../actions/userActions';
import { SessionState, newSessionState, storeUserSettings } from '../states/sessionState';


const initialState = newSessionState();


export function sessionReducer(state: SessionState, action: UserAction): SessionState {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case LOGIN_USER: {
            const {user, userLoginError} = action;
            return {...state, user, userLoginError, userLoginInProgress: false};
        }
        case LOGOUT_USER: {
            return {...state, user: null};
        }
        case START_USER_LOGIN: {
            return {...state, userLoginInProgress: true};
        }
        case UPDATE_SETTINGS: {
            storeUserSettings(action.settings);
            return action.settings;
        }
    }
    return state;
}
