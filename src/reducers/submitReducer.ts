import { newSubmitState, SubmitState } from "../states/submitState";
import { CLOSE_SUBMIT_STEPS, OPEN_SUBMIT_STEPS, SubmitAction } from "../actions/submitActions";

const initialState = newSubmitState();

export function submitReducer(state: SubmitState = initialState, action: SubmitAction) {
    switch (action.type) {
        case OPEN_SUBMIT_STEPS:
            return {...state, submitStepsOpen: true};
        case CLOSE_SUBMIT_STEPS:
            return {...state, submitStepsOpen: false};
        default:
            return state;
    }
}