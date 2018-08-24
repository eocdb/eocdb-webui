import * as constants from './constants'

export interface QueryMeasurements {
    type: constants.QUERY_MEASUREMENTS;
    queryString: string;
}

export type EocdbAction = QueryMeasurements;

export function queryMeasurements(queryString: string): QueryMeasurements {
    return {
        type: constants.QUERY_MEASUREMENTS,
        queryString
    }
}