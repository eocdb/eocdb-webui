import * as reducers from "../src/reducers";
import * as types from "../src/constants";


describe('reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([
            {
                text: 'Use Redux',
                completed: false,
                id: 0
            }
        ])
    });
}