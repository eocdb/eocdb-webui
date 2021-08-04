import { QueryResult } from '../model';
import { SearchHistoryItem } from "../types/dataset";
import { DatasetQuery } from "../api/findDatasets";


export interface SearchFormState {
    datasetQuery: DatasetQuery;
    foundDatasets: QueryResult;
    searchHistory: SearchHistoryItem[];
    saveSearchTitle: string;
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
        searchHistory: [
            {
                key: 'test',
                query: {
                    geojson: true,
                    productGroupNames: [],
                    startDate: null,
                    endDate: null,
                    searchExpr: '',
                }
            }
        ],
        saveSearchTitle: '',
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
