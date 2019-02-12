import { newSearchFormState } from "./searchFormState";

describe('searchFormState', () => {
    it('newSearchFormState', () => {
        const expected ={
            datasetQuery: {
                startDate: "1980-01-01",
                endDate: "2020-01-01",
                geojson: true,
                productGroupNames: ['b'],
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