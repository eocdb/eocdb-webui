import { DatasetQuery } from '../api';
import { QueryResult, SearchHistoryItem } from '../types/dataset';


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
