import configureMockStore from 'redux-mock-store'

import thunk from 'redux-thunk'
import  'fetch-mock'

import * as actions from '../src/actions'
import * as types from '../src/constants'
import * as fetchMock from "fetch-mock";

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
        fetchMock
            .getOnce('http://localhost:4000/eocdb/api/measurements?query=ernie', {
                body: {res: ['ernie']},
                headers: {'content-type': 'application/json'}
            })

        const expectedActions = [
            {type: types.MEASUREMENT_RESULTS}
        ];
        const store = mockStore({res: []})
​
    return store.dispatch(actions.queryMeasurements("ernie")).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
    });
    });
})