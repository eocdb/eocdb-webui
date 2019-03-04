import { DatasetQuery } from '../api';
import { QueryResult } from '../model';
import { SearchHistoryItem } from "../types/dataset";


export interface SearchFormState {
    datasetQuery: DatasetQuery;
    foundDatasets: QueryResult;
    searchHistory: SearchHistoryItem[];
    loading: boolean;
}

export function newSearchFormState() {
    return {
        datasetQuery: {
            geojson: true,
            productGroupNames: [],
            startDate: null,
            endDate: null,
            searchExpr: '',
        },
        searchHistory: [],
        foundDatasets: {
            locations: new Map(),
            datasets: [],
            query: {
                mtype: '',
                shallow: '',
                wdepth: '',
            },
            total_count: 0,
        },
        loading: false,
    };
}
