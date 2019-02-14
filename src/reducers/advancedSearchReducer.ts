import { AdvancedSearchState } from "../states/advancedSearchState";

import {
    AdvancedSearchAction,
    UPDATE_BBOX, UPDATE_WAVELENGTH, UPDATE_WATERDEPTH, UPDATE_OPTSHALLOW
} from "../actions/advancedSearchActions";

import { newAdvancedSearchState } from "../states/advancedSearchState";

const initialState = newAdvancedSearchState();

export function advancedSearchReducer(state: AdvancedSearchState = initialState, action: AdvancedSearchAction) {
    switch (action.type) {
        case UPDATE_BBOX:
            return {...state, selectedBounds: action.selectedBounds};
        case UPDATE_WAVELENGTH:
            return {...state, selectedWavelength: action.selectedWavelength};
        case UPDATE_WATERDEPTH: {
            return {...state, waterDepthMin: action.waterDepthMin, waterDepthMax: action.waterDepthMax};
        }
        case UPDATE_OPTSHALLOW: {
            return {...state, selectedOptShallow: action.selectedOptShallow};
        }
        default:
            return state;
    }
}
