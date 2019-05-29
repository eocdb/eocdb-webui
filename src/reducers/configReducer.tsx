import { ConfigState, newConfigState } from '../states/configState';

import { ConfigAction, GET_MATCHUP_FILES, SET_API_SERVER_URL } from '../actions/configActions';

const initialState = newConfigState();

export function configReducer(state: ConfigState, action: ConfigAction): ConfigState  {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case SET_API_SERVER_URL:
            return {...state, apiServerUrl: action.apiServerUrl};
        case GET_MATCHUP_FILES:
            return {...state, matchupFiles: action.matchupFiles}
    }
    return state;
}
