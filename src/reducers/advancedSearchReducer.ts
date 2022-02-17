import {
    AdvancedSearchAction,
    UPDATE_BBOX, UPDATE_WAVELENGTH, UPDATE_WATERDEPTH, UPDATE_OPTSHALLOW, UPDATE_PRODUCTS
} from "../actions/advancedFindActions";

import { newSearchFormState, SearchFormState } from "../states/searchFormState";

const initialState = newSearchFormState();

export function advancedSearchReducer(state: SearchFormState = initialState, action: AdvancedSearchAction): SearchFormState {
    switch (action.type) {
        case UPDATE_BBOX:
            return {...state, datasetQuery:
                    {...state.datasetQuery, selectedBBox: action.selectedBBox}
            };
        case UPDATE_WAVELENGTH:
            return {...state, datasetQuery: {
                    ...state.datasetQuery, wavelengthsMode: action.selectedWavelength
                }};
        case UPDATE_WATERDEPTH: {
            return {...state, datasetQuery: {
                    ...state.datasetQuery, wdepth: action.waterDepth
                }};
        }
        case UPDATE_OPTSHALLOW: {
            return {...state, datasetQuery: {
                    ...state.datasetQuery, shallow: action.selectedOptShallow
                }};
        }
        case UPDATE_PRODUCTS: {
            return {...state, datasetQuery: {
                    ...state.datasetQuery, productNames: action.selectedProducts
                }};
        }
        default:
            return state;
    }
}
