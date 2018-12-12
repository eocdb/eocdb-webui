import { DatasetQuery } from '../api';
import { QueryResult, SearchHistoryItem } from '../types/dataset';

export interface SearchFormState {
    datasetQuery: DatasetQuery;
    storedDatasetQueries: { [name: string]: DatasetQuery };
    foundDatasets: QueryResult;
    searchHistory: SearchHistoryItem[];
}

export function newSearchFormState() {
    return {
        datasetQuery: {
            startDate: "1980-01-01",
            endDate: "2020-01-01",
            geojson: true,
        },
        storedDatasetQueries: {},
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
        }
    };
}
