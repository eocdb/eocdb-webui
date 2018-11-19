import { SearchFormState, newSearchFormState } from '../states/searchFormState';
import { SearchFormAction, UPDATE_DATASET_QUERY, UPDATE_FOUND_DATASETS } from '../actions/searchFormActions';

const initialState = newSearchFormState();

export function searchFormReducer(state: SearchFormState, action: SearchFormAction): SearchFormState {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case UPDATE_DATASET_QUERY: {
            return {...state, datasetQuery: action.datasetQuery};
        }
        case UPDATE_FOUND_DATASETS: {
            return {...state, foundDatasets: action.foundDatasets};
        }
    }
    return state;
}
