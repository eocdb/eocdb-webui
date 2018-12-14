import { AdvancedSearchState } from "../states/advancedSearchState";

import {
    AdvancedSearchAction, BOTTOM_CHANGE, LEFT_CHANGE,
    LOG_CHANGE, RIGHT_CHANGE, TOP_CHANGE
} from "../actions/advancedSearchActions";

import { newAdvancedSearchState } from "../states/advancedSearchState";

const initialState = newAdvancedSearchState()

export function advancedSearchReducer(state: AdvancedSearchState, action: AdvancedSearchAction) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case LOG_CHANGE:
            return {...state, filterLog: action.filterLog};
        case LEFT_CHANGE:
            return {...state, left: action.left};
        case BOTTOM_CHANGE:
            return {...state, bottom: action.bottom};
        case RIGHT_CHANGE:
            return {...state, right: action.right};
        case TOP_CHANGE:
            return {...state, top: action.top};
    }
    return state;
}
