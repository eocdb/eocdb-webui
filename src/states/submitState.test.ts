import { newSubmitState } from "./submitState";

describe('submitState', () => {
    it('newSubmitState', () => {
        const expected = {
            submitStepsOpen: false,
            activeStep: 0,
        };

        expect(newSubmitState()).toEqual(expected);
    });
});