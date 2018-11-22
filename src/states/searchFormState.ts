import { DatasetQuery } from '../api';
import { QueryResult } from '../types/dataset';

export interface SearchFormState {
    datasetQuery: DatasetQuery;
    storedDatasetQueries: { [name: string]: DatasetQuery };
    foundDatasets: QueryResult;
}

export function newSearchFormState() {
    return {
        datasetQuery: {
            startDate: "1980-01-01",
            endDate: "2020-01-01",
        },
        storedDatasetQueries: {},
        foundDatasets: {
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
