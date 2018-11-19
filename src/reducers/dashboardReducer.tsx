import { DashboardState, newDashboardState } from '../states/dashboardState';

import {
    DashboardAction,
    CHANGE_DRAWER,
    OPEN_USER_DIALOG,
    OPEN_CONFIG_DIALOG, CLOSE_USER_DIALOG, CLOSE_CONFIG_DIALOG
} from '../actions/dashboardActions';

const initialState = newDashboardState();

export function dashboardReducer(state: DashboardState, action: DashboardAction) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case CHANGE_DRAWER:
            return {...state, currentDrawer: action.currentDrawer};
        case OPEN_USER_DIALOG:
            return {...state, dlgUserOpen: action.dlgUserOpen};
        case CLOSE_USER_DIALOG:
            return {...state, dlgUserOpen: action.dlgUserOpen};
        case OPEN_CONFIG_DIALOG:
            return {...state, dlgConfigOpen: action.dlgConfigOpen};
        case CLOSE_CONFIG_DIALOG:
            return {...state, dlgConfigOpen: action.dlgConfigOpen};
    }
    return state;
}
