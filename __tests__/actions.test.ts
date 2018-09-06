import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as fetchMock from "fetch-mock";
import * as actions from '../src/actions'
import * as types from '../src/constants'


// empty data JSON array for testing async redux thunks
const emptyData = JSON.parse('[""]');


// test actions
describe('actions', () => {
    it('Should create a query measurement action', () => {
        const queryString = "ernie";
        const exp = {
            type: types.QUERY_MEASUREMENTS,
            queryString
        };
        expect(actions._queryMeasurements('ernie')).toEqual(exp);
    });
    it('Should create a set measurement action', () => {
        const exp = {
            type: types.MEASUREMENT_RESULTS,
            data: emptyData
        };
        expect(actions.setMeasurementResults(emptyData)).toEqual(exp);
    });
    it('Should create a measurement fail action', () => {
        const exp = {
            type: types.MEASUREMENT_FAIL,
            error: 'ERROR'
        };
        expect(actions.reportMeasurementFail("ERROR")).toEqual(exp);
    });
});


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {

        fetchMock.getOnce(
            'http://localhost:4000/eocdb/api/measurements?query=ernie',
            {
                body: { id: ['ernie'] },
                headers: { 'content-type': 'application/json' }
            }
        );

        const expectedActions = [
            {type: types.QUERY_MEASUREMENTS, queryString: "ernie"},
            {type: types.MEASUREMENT_RESULTS , data: {id: ["ernie"]}}
        ];

        const store = mockStore({queryString: "ernie", data: {id: ["ernie"]}});

        return store.dispatch(actions.queryMeasurements("ernie") as any).then(() => { /* TODO: Fix "as any" */
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});

