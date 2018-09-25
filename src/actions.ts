import { Dispatch } from 'redux';
import { MeasurementData, StoreState } from "./types";
import * as constants from './constants';


export interface QueryMeasurements{
    type: constants.QUERY_MEASUREMENTS;
    queryString: string;
}


export interface OffsetResults {
    type: constants.OFFSET_RESULTS;
    start: number;
    offset: number;
}

export interface MeasurementResults{
    type: constants.MEASUREMENT_RESULTS;
    data: MeasurementData;
}


export interface MeasurementFail{
    type: constants.MEASUREMENT_FAIL;
    error: string;
}


export type EocdbAction = QueryMeasurements | MeasurementResults | MeasurementFail | OffsetResults ;


//type ThunkAction2<R> = ThunkAction<R, StoreState, void, EocdbAction>;
//export type ThunkActionCreator<R> = (...args: any[]) => ThunkAction2<R>;


export function _offsetResults(start: number, offset: number): OffsetResults{
    return {
        type: constants.OFFSET_RESULTS,
        start,
        offset,
    }
}


export function offsetResults(start: number, offset: number) {
    return (dispatch: Dispatch, getState: () => StoreState) => {
        dispatch(_offsetResults(start, offset));
        let queryString = getState().queryString;
        if(!queryString){
            queryString = 'ernie';
        }
        console.log("getState():", getState());
        const api1 = `http://localhost:4000/eocdb/api/measurements/${start}/${offset}?query=${encodeURIComponent(queryString)}`;
        console.log(api1);

        return fetch(`http://localhost:4000/eocdb/api/measurements?query=${encodeURIComponent(queryString)}`)
            .then(
                value => {
                    return value.json();
                }
            )
            .then(
                result => {
                    dispatch(setMeasurementResults(result));
                    return result;
                }
            ).catch(error => {
                dispatch(reportMeasurementFail(error));
                return error;
            });
    };
}


export function _queryMeasurements(queryString: string): QueryMeasurements {
    return {
        type: constants.QUERY_MEASUREMENTS,
        queryString
    }
}


export function setMeasurementResults(data: MeasurementData): MeasurementResults {
    return {
        type: constants.MEASUREMENT_RESULTS,
        data
    }
}


export function reportMeasurementFail(error: string): MeasurementFail{
    return {
        type: constants.MEASUREMENT_FAIL,
        error
    }
}


export function queryMeasurements(queryString: string) {
    return (dispatch: Dispatch, getState: () => StoreState) => {
        dispatch(_queryMeasurements(queryString));
        console.log("getState().queryString:", getState());

        return fetch(`http://localhost:4000/eocdb/api/measurements?query=${encodeURIComponent(queryString)}`)
            .then(
                value => {
                    return value.json();
                }
            )
            .then(
                result => {
                    dispatch(setMeasurementResults(result));
                    return result;
                }
            ).catch(error => {
                dispatch(reportMeasurementFail(error));
                return error;
            });
    };
}
