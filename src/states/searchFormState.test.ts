import { newSearchFormState } from "./searchFormState";

describe('searchFormState', () => {
    it('newSearchFormState', () => {
        const expected = {
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

        expect(newSearchFormState()).toEqual(expected);
    });
});