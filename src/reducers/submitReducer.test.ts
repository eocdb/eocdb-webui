import { submitReducer } from "./submitReducer";
import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    SET_ACTIVE_STEP_DOWN,
    SET_ACTIVE_STEP_UP
} from "../actions/submitActions";


describe('submitStepsReducer', () => {
    it('submitReducer to open submit steps', () => {
        const result = submitReducer(undefined, {type: OPEN_SUBMIT_STEPS});
        expect(result.submitStepsOpen).toEqual(true);
    });

    it('submitReducer to close submit steps', () => {
        const result = submitReducer(undefined, {type: CLOSE_SUBMIT_STEPS});
        expect(result.submitStepsOpen).toEqual(false);
    });

    it('submitReducer to get to proceed to the next step', () => {
        const result = submitReducer(undefined, {type: SET_ACTIVE_STEP_UP});
        expect(result.activeStep).toEqual(1);
    });

    it('submitReducer to get to proceed to the next step', () => {
        const result = submitReducer({activeStep: 2, submitStepsOpen: true}, {type: SET_ACTIVE_STEP_DOWN});
        expect(result.activeStep).toEqual(1);
    });
});

