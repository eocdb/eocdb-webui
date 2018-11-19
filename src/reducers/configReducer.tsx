import { ConfigState, newConfigState } from '../states/configState';

import { ConfigAction, CONFIG_SERVER } from '../actions/configActions';

const initialState = newConfigState();

export function configReducer(state: ConfigState, action: ConfigAction): ConfigState  {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case CONFIG_SERVER:
            return {...state, apiServerUrl: action.apiServerUrl};
    }
    return state;
}
