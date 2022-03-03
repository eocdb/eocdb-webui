import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";


import {
    START_LOADING,
    STOP_LOADING,
    UPDATE_DATASET_QUERY,
    UPDATE_FOUND_DATASETS,
    startLoading,
    searchDatasets,
    stopLoading,
    updateDatasetQuery,
    updateFoundDatasets
} from "./findActions";
import { SERVER_CONFIG } from "../api/config";
import { LatLng } from "leaflet";
import { DefaultDatasetQuery } from "../model/DatasetQuery";
import fetchMock from "fetch-mock";
import { POST_MESSAGE } from "./messageLogActions";



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const EUMETSAT_LAT_LNG = new LatLng(49.858996564, 8.622830842);

const initState = {
    sessionState: {
        user: null,
        userLoginError: null,
        userLoginInProgress: false,
        legalAgreementAccepted: false,
        userLoggedIn: false,
    },
    configState: {apiServerUrl: SERVER_CONFIG},
    searchFormState: {
        datasetQuery: {
            startDate: "1980-01-01",
            endDate: "2020-01-01",
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
    },
    searchMapState: {
        position: EUMETSAT_LAT_LNG,
        zoom: 4,
    },
    advancedSearchState: {
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        filterLog: [],
    },
    dataTableState: {
        page: 0,
        rowsPerPage: 5,

        metaInfoDialogOpen: false,
        plotDialogOpen: false,
        downloadDocs: false,

        dataset: {
            id: "",
            path: '',
            metadata: new Map(),
            records: [],
            longitudes: [],
            latiudes: [],
            attributes: [],
            times: [],
        },
    },
};

describe('searchFormActions', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('should create a startLoading action', () => {
        const expectedAction = {
            type: START_LOADING,
            loading: true,
        };

        expect(startLoading()).toEqual(expectedAction);
    });

    it('should create a stopLoading action', () => {
        const expectedAction = {
            type: STOP_LOADING,
            loading: false,
        };

        expect(stopLoading()).toEqual(expectedAction);
    });

    it('updateFoundDatasets', () => {
        const foundDatasets = {
            locations: new Map(),
            datasets: [],
            query: {
                ...DefaultDatasetQuery,
                mtype: '',
                shallow: ''
            },
            total_count: 0,
        };

        const expectedAction = {
            type: UPDATE_FOUND_DATASETS,
            foundDatasets,
        };

        expect(updateFoundDatasets(foundDatasets)).toEqual(expectedAction);
    });

    it('should create a updateDatasetQuery action', () => {
        const datasetQuery = {
            ...DefaultDatasetQuery,
            startDate: "1980-01-01",
            endDate: "2020-01-01",
            geojson: true,
            productGroupNames: [],
        };
        const expectedAction = {
            type: UPDATE_DATASET_QUERY,
            datasetQuery
        };

        expect(updateDatasetQuery(datasetQuery)).toEqual(expectedAction);
    });

    it('Should fetch datasets', () => {
        const queryComponents = '?start_time=1980-01-01&end_time=2020-01-01&offset=1&count=5&geojson=true';
        const apiServerUrl = SERVER_CONFIG + '/datasets' + queryComponents;

        fetchMock.getOnce(apiServerUrl, {
            body: {},
            headers: {'content-type': 'application/json'}
        });

        const expectedActions = [
            {
                type: UPDATE_FOUND_DATASETS,
                foundDatasets: {}
            },
            {
                type: POST_MESSAGE,
                messageType: "success",
                messageText: "undefined Datasets Found"
            },
            {
                type: UPDATE_DATASET_QUERY,
                datasetQuery: {
                    startDate: "1980-01-01",
                    endDate: "2020-01-01",
                    geojson: true,
                    productGroupNames: [],
                    status: "PUBLISHED",
                    count: 5,
                    offset: 1
                }
            },
            {
                type: STOP_LOADING,
                loading: false
            }
        ];

        const store = mockStore(initState);

        return store.dispatch(searchDatasets() as any).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        })
    });
});



