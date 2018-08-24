import { EocdbAction } from './actions';
import { StoreState } from './types';
import { QUERY_MEASUREMENTS } from './constants';

export function reduceStoreState(state: StoreState, action: EocdbAction): StoreState {
    switch (action.type) {
        case QUERY_MEASUREMENTS:

            const queryString = action.queryString;
            let data;
            if (queryString === "Ernie") {
                data = [
                    ["Name", "Status"],
                    ["Ernie", "Dead"],
                    ["Ernie", "Alive"],
                    ["Ernie", "Sleeping"],
                    ["Ernie", "Awake"],
                    ["Ernie", "Cycling"]
                ];
            }
            return {...state, queryString, data};

    }
    return state;
}