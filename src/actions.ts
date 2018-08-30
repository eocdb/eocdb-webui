import * as constants from './constants'
import { ThunkAction } from "redux-thunk";
import { MeasurementData, StoreState } from "./types";
import { Dispatch } from "redux";

export interface QueryMeasurements {
    type: constants.QUERY_MEASUREMENTS;
    queryString: string;
}


export interface MeasurementResults {
    type: constants.MEASUREMENT_RESULTS;
    data: MeasurementData;
}

export type EocdbAction = QueryMeasurements | MeasurementResults;

export function _queryMeasurements(queryString: string): QueryMeasurements {
    return {
        type: constants.QUERY_MEASUREMENTS,
        queryString
    }
}

export function setMeasurementResults(data: MeasurementData): MeasurementResults{
    return {
        type: constants.MEASUREMENT_RESULTS,
        data
    }
}

export function queryMeasurements(queryString: string): ThunkAction<void, StoreState, undefined, QueryMeasurements> {
    return (dispatch: Dispatch, getState: () => StoreState) => {
        dispatch(_queryMeasurements(queryString));
        console.log("getState().queryString:", getState().queryString);
        fetch(`http://localhost:4000/eocdb/api/measurements?query=${encodeURIComponent(queryString)}`)
            .then(
                value => {
                    return value.json();
                }
            )
            .then(
                result => {
                    console.log(result);
                    dispatch(setMeasurementResults(result));
                }
            );
    };
}