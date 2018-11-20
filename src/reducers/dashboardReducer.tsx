import { DashboardState, newDashboardState } from '../states/dashboardState';

import {
    DashboardAction,
    CHANGE_DRAWER,
    OPEN_LOGIN_DIALOG,
    OPEN_CONFIG_DIALOG, CLOSE_LOGIN_DIALOG, CLOSE_CONFIG_DIALOG
} from '../actions/dashboardActions';

const initialState = newDashboardState();

export function dashboardReducer(state: DashboardState, action: DashboardAction) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case CHANGE_DRAWER:
            return {...state, currentDrawer: action.currentDrawer};
        case OPEN_LOGIN_DIALOG:
            return {...state, loginDialogOpen: true};
        case CLOSE_LOGIN_DIALOG:
            return {...state, loginDialogOpen: false};
        case OPEN_CONFIG_DIALOG:
            return {...state, configDialogOpen: true};
        case CLOSE_CONFIG_DIALOG:
            return {...state, configDialogOpen: false};
    }
    return state;
}
