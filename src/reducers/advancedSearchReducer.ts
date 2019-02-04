import { AdvancedSearchState } from "../states/advancedSearchState";

import {
    AdvancedSearchAction,
    BBOX_CHANGE, UPDATE_SELECTED_WAVELENGTH
} from "../actions/advancedSearchActions";

import { newAdvancedSearchState } from "../states/advancedSearchState";

const initialState = newAdvancedSearchState();

export function advancedSearchReducer(state: AdvancedSearchState, action: AdvancedSearchAction) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case BBOX_CHANGE:
            return {...state, selectedBounds: action.selectedBounds};
        case UPDATE_SELECTED_WAVELENGTH:
            return {...state, selectedWavelength: action.selectedWavelength};
    }
    return state;
}
