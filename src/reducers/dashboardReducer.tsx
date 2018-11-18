import { DashboardState, newDashboardState } from '../types/dashboardState';

import { CHANGE_DRAWER, DashboardAction, changeDrawer } from '../actions/dashboardActions';

const initialState = newDashboardState();

export function dashboardReducer(state: DashboardState, action: DashboardAction) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case CHANGE_DRAWER:
            return {...state, selectedRegions: changeDrawer};
    }
    return state;
}
