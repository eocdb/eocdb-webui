import { DatasetQuery } from '../api';
import { QueryResult } from "../types/dataset";


export interface AdvancedSearchState {
    datasetQuery: DatasetQuery;
    foundDatasets: QueryResult;
}


export function newAdvancedSearchState() {
    return {
        datasetQuery: {
            startDate: "1980-01-01",
            endDate: "2020-01-01",
            geojson: true,
        },
        foundDatasets: {
            locations: new Map(),
            datasets: [],
            query: {
                mtype: '',
                shallow: '',
                wdepth: '',
            },
            total_count: 0,
        }
    };
}
