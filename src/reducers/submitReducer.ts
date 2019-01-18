import { newSubmitState, SubmitState } from "../states/submitState";
import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    SET_ACTIVE_STEP_DOWN,
    SET_ACTIVE_STEP_UP,
    SubmitAction
} from "../actions/submitActions";

const initialState = newSubmitState();

export function submitReducer(state: SubmitState = initialState, action: SubmitAction) {
    switch (action.type) {
        case OPEN_SUBMIT_STEPS:
            return {...state, submitStepsOpen: true};
        case CLOSE_SUBMIT_STEPS:
            return {...state, submitStepsOpen: false};
        case SET_ACTIVE_STEP_UP:
            return {...state, activeStep: (state.activeStep + 1)};
        case SET_ACTIVE_STEP_DOWN:
            return {...state, activeStep: (state.activeStep - 1)};
        default:
            return state;
    }
}