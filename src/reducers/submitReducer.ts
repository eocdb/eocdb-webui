import { newSubmitState, SubmitState } from "../states/submitState";
import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    UPDATE_DATA_FILES,
    SUBMIT_FILES,
    SubmitAction,
    UPDATE_DOC_FILES
} from "../actions/submitActions";

const initialState = newSubmitState();

export function submitReducer(state: SubmitState = initialState, action: SubmitAction) {
    switch (action.type) {
        case OPEN_SUBMIT_STEPS:
            return {...state, submitStepsOpen: true};
        case CLOSE_SUBMIT_STEPS:
            return {...state, submitStepsOpen: false};
        case UPDATE_DATA_FILES:
            return {...state, dataFiles: state.dataFiles};
        case UPDATE_DOC_FILES:
            return {...state, dataFiles: state.docFiles};
        case SUBMIT_FILES:
            return {...state, acceptedFiles: state.docFiles, dataFiles: state.docFiles};
        default:
            return state;
    }
}