import { ConfigState, newConfigState } from '../states/configState';

import { ConfigAction } from '../actions/configActions';

const initialState = newConfigState();

export function configReducer(state: ConfigState, action: ConfigAction): ConfigState  {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        /* TODO */
    }
    return state;
}
