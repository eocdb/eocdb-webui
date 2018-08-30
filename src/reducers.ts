import { EocdbAction } from './actions';
import { StoreState } from './types';
import { QUERY_MEASUREMENTS, MEASUREMENT_RESULTS } from './constants';


export function reduceStoreState(state: StoreState, action: EocdbAction): StoreState {
    switch (action.type) {
        case QUERY_MEASUREMENTS:

            const queryString = action.queryString;

            return {...state, queryString};
        case MEASUREMENT_RESULTS:
            const data = action.data;

            return {...state, data};
    }
    return state;
}

