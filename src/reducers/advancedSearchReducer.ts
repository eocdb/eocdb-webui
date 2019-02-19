import { AdvancedSearchState } from "../states/advancedSearchState";

import {
    AdvancedSearchAction,
    UPDATE_BBOX, UPDATE_WAVELENGTH, UPDATE_WATERDEPTH, UPDATE_OPTSHALLOW, UPDATE_PRODUCTS, UPDATE_PRODUCT_VALUE
} from "../actions/advancedSearchActions";

import { newAdvancedSearchState } from "../states/advancedSearchState";

const initialState = newAdvancedSearchState();

export function advancedSearchReducer(state: AdvancedSearchState = initialState, action: AdvancedSearchAction) {
    switch (action.type) {
        case UPDATE_BBOX:
            return {...state, selectedBBox: action.selectedBBox};
        case UPDATE_WAVELENGTH:
            return {...state, selectedWavelength: action.selectedWavelength};
        case UPDATE_WATERDEPTH: {
            return {...state, waterDepth: action.waterDepth};
        }
        case UPDATE_OPTSHALLOW: {
            return {...state, selectedOptShallow: action.selectedOptShallow};
        }
        case UPDATE_PRODUCTS: {
            return {...state, selectedProducts: action.selectedProducts};
        }
        case UPDATE_PRODUCT_VALUE: {
            return {...state, productInputValue: action.productInputValue}
        }
        default:
            return state;
    }
}
