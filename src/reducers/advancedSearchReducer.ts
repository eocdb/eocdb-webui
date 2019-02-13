import { AdvancedSearchState } from "../states/advancedSearchState";

import {
    AdvancedSearchAction,
    BBOX_CHANGE, UPDATE_SELECTED_WAVELENGTH, UPDATE_WATERDEPTH
} from "../actions/advancedSearchActions";

import { newAdvancedSearchState } from "../states/advancedSearchState";

const initialState = newAdvancedSearchState();

export function advancedSearchReducer(state: AdvancedSearchState = initialState, action: AdvancedSearchAction) {
    switch (action.type) {
        case BBOX_CHANGE:
            return {...state, selectedBounds: action.selectedBounds};
        case UPDATE_SELECTED_WAVELENGTH:
            return {...state, selectedWavelength: action.selectedWavelength};
        case UPDATE_WATERDEPTH: {
            return {...state, waterDepthMin: action.waterDepthMin, waterDepthMax: action.waterDepthMax};
        }
        default:
            return state;
    }
}
