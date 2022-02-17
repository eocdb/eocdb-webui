import { QueryResult, DatasetQuery } from '../model';
import { SearchHistoryItem } from "../types/dataset";
import { DefaultDatasetQuery } from "../model/DatasetQuery";


export interface SearchFormState {
    datasetQuery: DatasetQuery;
    foundDatasets: QueryResult;
    searchHistory: SearchHistoryItem[];
    saveSearchTitle: string;
    loading: boolean;
}


export function newSearchFormState() {
    return {
        datasetQuery: DefaultDatasetQuery,
        searchHistory: [
            {
                key: '',
                query: DefaultDatasetQuery
            }
        ],
        saveSearchTitle: '',
        foundDatasets: {
            locations: new Map(),
            datasets: [],
            query: DefaultDatasetQuery,
            total_count: 0,
        },
        loading: false,
    };
}
