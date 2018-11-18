import { AppState, newAppState } from '../types/appState';


interface AppAction {
    type: string;
}

const initialState = newAppState();


export function appReducer(state: AppState, action: AppAction) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    return state;
}
