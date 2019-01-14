import { submitReducer } from "./submitReducer";
import { CLOSE_SUBMIT_STEPS, OPEN_SUBMIT_STEPS } from "../actions/submitActions";


describe('submitStepsReducer', () => {
    it('submitReducer to open submit steps', () => {
        const result = submitReducer(undefined, {type: OPEN_SUBMIT_STEPS});
        expect(result).toEqual({submitStepsOpen: true});
    });

    it('submitReducer to close submit steps', () => {
        const result = submitReducer(undefined, {type: CLOSE_SUBMIT_STEPS});
        expect(result).toEqual({submitStepsOpen: false});
    });
});

