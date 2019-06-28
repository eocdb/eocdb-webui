import { DashboardState, newDashboardState } from '../states/dashboardState';

import {
    DashboardAction,
    CHANGE_DRAWER,
    OPEN_LOGIN_DIALOG,
    OPEN_CONFIG_DIALOG,
    OPEN_ADVANCED_SEARCH_DIALOG,
    OPEN_HELP_DIALOG,
    CLOSE_LOGIN_DIALOG,
    CLOSE_CONFIG_DIALOG,
    CLOSE_HELP_DIALOG,
    CLOSE_ADVANCED_SEARCH_DIALOG,
    OPEN_HELP_METAINFO_DIALOG,
    CLOSE_HELP_METAINFO_DIALOG,
    OPEN_SAVE_SEARCH_DIALOG,
    CLOSE_SAVE_SEARCH_DIALOG,
    OPEN_PRODUCTGROUPSHELP_DIALOG,
    CLOSE_PRODUCTGROUPSHELP_DIALOG,
    OPEN_USER_REGISTRATION_DIALOG, CLOSE_USER_REGISTRATION_DIALOG
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
        case OPEN_ADVANCED_SEARCH_DIALOG:
            return {...state, advancedSearchDialogOpen: true};
        case CLOSE_ADVANCED_SEARCH_DIALOG:
            return {...state, advancedSearchDialogOpen: false};
        case OPEN_SAVE_SEARCH_DIALOG:
            return {...state, saveSearchDialogOpen: true};
        case CLOSE_SAVE_SEARCH_DIALOG:
            return {...state, saveSearchDialogOpen: false};
        case OPEN_HELP_DIALOG:
            return {...state, helpDialogOpen: true};
        case CLOSE_HELP_DIALOG:
            return {...state, helpDialogOpen: false};
        case OPEN_PRODUCTGROUPSHELP_DIALOG:
            return {...state, productGroupsHelpDialogOpen: true};
        case CLOSE_PRODUCTGROUPSHELP_DIALOG:
            return {...state, productGroupsHelpDialogOpen: false};
        case OPEN_HELP_METAINFO_DIALOG:
            return {...state, helpMetaInfoDialogOpen: true, helpMetaInfoKey: action.helpMetaInfoKey};
        case CLOSE_HELP_METAINFO_DIALOG:
            return {...state, helpMetaInfoDialogOpen: false};
        case OPEN_USER_REGISTRATION_DIALOG:
            return {...state, userRegistrationDialogOpen: true};
        case CLOSE_USER_REGISTRATION_DIALOG:
            return {...state, userRegistrationDialogOpen: false};
    }
    return state;
}
