import { EocdbAction } from './actions';
import { StoreState } from './types';
import { QUERY_MEASUREMENTS, MEASUREMENT_RESULTS, OFFSET_RESULTS, MEASUREMENT_FAIL, REGION_SELECT_CHANGE } from './constants';


export function reduceStoreState(state: StoreState, action: EocdbAction): StoreState {
    switch (action.type) {
        case QUERY_MEASUREMENTS:
            const queryString = action.queryString;

            return {...state, queryString};
        case OFFSET_RESULTS:
            const offset = action.offset;
            const start = action.start;

            return {...state, offset, start};
        case REGION_SELECT_CHANGE:
            const rectangle = action.rectangle;

            return {...state, rectangle};
        case MEASUREMENT_RESULTS:
            const data = action.data;

            return {...state, data};
        case MEASUREMENT_FAIL:
            const error = action.error;

            return {...state, data: JSON.parse(error)};
    }
    return state;
}

