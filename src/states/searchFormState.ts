import { DatasetQuery } from '../api';

export interface SearchFormState {
    datasetQuery: DatasetQuery;
    storedDatasetQueries: { [name: string]: DatasetQuery };
}

export function newSearchFormState() {
    return {
        datasetQuery: {},
        storedDatasetQueries: {},
    };
}
