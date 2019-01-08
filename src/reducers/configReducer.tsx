import { ConfigState, newConfigState } from '../states/configState';

import { ConfigAction, CONFIGURE_API_SERVER } from '../actions/configActions';

const initialState = newConfigState();

export function configReducer(state: ConfigState, action: ConfigAction): ConfigState  {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case CONFIGURE_API_SERVER:
            return {...state, apiServerUrl: action.apiServerUrl, apiServerAuth: action.apiServerAuth};
    }
    return state;
}
