import { newSubmitState } from "./submitState";

describe('submitState', () => {
    it('newSubmitState', () => {
        const expected = {
            submitStepsOpen: false,
            dataFiles: [],
            docFiles: [],
        };

        expect(newSubmitState()).toEqual(expected);
    });
});