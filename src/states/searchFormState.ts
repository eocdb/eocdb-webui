import { DatasetQuery } from '../api';
import { DatasetRef } from '../types/dataset';

export interface SearchFormState {
    datasetQuery: DatasetQuery;
    storedDatasetQueries: { [name: string]: DatasetQuery };
    foundDatasets?: DatasetRef[];
}

export function newSearchFormState() {
    return {
        datasetQuery: {
            startDate: "1980-01-01",
            endDate: "2020-01-01",
        },
        storedDatasetQueries: {},
    };
}
