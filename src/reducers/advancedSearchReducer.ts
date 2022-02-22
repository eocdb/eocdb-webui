import {
    AdvancedSearchAction,
    UPDATE_BBOX
} from "../actions/advancedFindActions";

import { newSearchFormState, SearchFormState } from "../states/searchFormState";

const initialState = newSearchFormState();

export function advancedSearchReducer(state: SearchFormState = initialState, action: AdvancedSearchAction): SearchFormState {
    switch (action.type) {
        case UPDATE_BBOX:
            return {...state, datasetQuery:
                    {...state.datasetQuery, selectedBBox: action.selectedBBox}
            };
        default:
            return state;
    }
}
