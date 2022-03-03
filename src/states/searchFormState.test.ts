import { newSearchFormState } from "./searchFormState";
import { DefaultDatasetQuery } from "../model/DatasetQuery";

describe('searchFormState', () => {
    it('newSearchFormState', () => {
        const expected = {
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
            loading: false
        }

        expect(newSearchFormState()).toEqual(expected);
    });
});
