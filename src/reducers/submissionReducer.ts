import { newSubmissionState, SubmissionState } from "../states/submissionState";
import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    UPDATE_DATA_FILES,
    SUBMIT_FILES,
    SubmitAction,
    UPDATE_DOC_FILES,
    UPDATE_SUBMISSION_ID,
    UPDATE_PATH,
    UPDATE_SUBMISSIONS_FOR_USER,
    CLEAR_FORM,
    UPDATE_SUBMISSIONSFILES_FOR_SUBMISSION
} from "../actions/submissionActions";


const initialState = newSubmissionState();

export function submissionReducer(state: SubmissionState = initialState, action: SubmitAction) {
    switch (action.type) {
        case OPEN_SUBMIT_STEPS:
            return {...state, submissionOpen: true};
        case CLOSE_SUBMIT_STEPS:
            return {...state, submissionOpen: false};
        case UPDATE_SUBMISSION_ID:
            return {...state, submissionId: action.submissionId};
        case UPDATE_PATH:
            return {...state, path: action.path};
        case UPDATE_DATA_FILES:
            return {...state, dataFiles: action.dataFiles};
        case UPDATE_DOC_FILES:
            return {...state, docFiles: action.docFiles};
        case CLEAR_FORM:
            return {...state, docFiles: [], dataFiles: [], submissionId: '', path: ''};
        case UPDATE_SUBMISSIONS_FOR_USER:
            return {...state, foundSubmissions: action.submissions};
        case UPDATE_SUBMISSIONSFILES_FOR_SUBMISSION:
            return {...state, currentSubmissionFiles: action.submissionFiles};
        case SUBMIT_FILES:
            return {...state, currentDatasetValidationResults: action.currentDatasetValidationResults};
        default:
            return state;
    }
}