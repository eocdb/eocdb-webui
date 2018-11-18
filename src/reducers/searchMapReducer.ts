import { SearchMapState, newSearchMapState } from '../types/searchMapState';
import { SearchMapAction, UPDATE_SELECTED_REGIONS } from '../actions/searchMapActions';

const initialState = newSearchMapState();

export function searchMapReducer(state: SearchMapState, action: SearchMapAction) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case UPDATE_SELECTED_REGIONS:
            return {...state, selectedRegions: action.selectedRegions};
    }
    return state;
}
