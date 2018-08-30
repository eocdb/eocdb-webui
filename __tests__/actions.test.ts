import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'fetch-mock'
import * as fetchMock from "fetch-mock";
import 'cross-fetch/polyfill';

import * as actions from '../src/actions'
import * as types from '../src/constants'

// test
describe('actions', () => {
    it('Should create an action for measurements', () => {
        const queryString = "ernie";
        const exp = {
            type: types.QUERY_MEASUREMENTS,
            queryString
        };
        expect(actions._queryMeasurements('ernie')).toEqual(exp);
    });
});


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    });

    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
        fetchMock.getOnce("http://localhost:4000/eocdb/api/measurements?query=ernie",
            {body: {queryString: "ernie"}, headers: {'content-type': 'application/json'}})

        const data = JSON.parse('{"id": [1,2,3,4,5],"lon": [58.1,58.4,58.5,58.2,58.9],"lat": [11.1,11.4,10.9,10.8,11.2],"chl": [0.3,0.2,0.7,0.2,0.1]}');
        const expectedActions = [
            {
                type: types.QUERY_MEASUREMENTS,
                queryString: "ernie"
            },
            {
                type: types.MEASUREMENT_RESULTS,
                data
            }
        ];

        const store = mockStore({queryString: "ernie", data})
​
        //store.dispatch(actions.queryMeasurements("ernie"));
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
    });
})
