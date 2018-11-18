import { SearchFormState, newSearchFormState } from '../types/searchFormState';
import { SearchFormAction } from '../actions/searchFormActions';

const initialState = newSearchFormState();

export function searchFormReducer(state: SearchFormState, action: SearchFormAction) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        /* TODO */
    }
    return state;
}
