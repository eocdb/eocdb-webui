import { AlertState, newAlertState } from "../states/messageLogState";
import { AlertAction, CLOSE_ALERT, OPEN_ALERT } from "../actions/alertActions";

const initialState = newAlertState();


export function alertReducer(state: AlertState, action: AlertAction): AlertState  {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case OPEN_ALERT: {
            return {...state, open: true, alertId: action.alertId}
        }
        case CLOSE_ALERT: {
            return {...state, open: false, alertId: action.alertId}
        }
    }
    return state;
}