import { newSubmissionState, SubmissionState } from "../states/submissionState";
import {
    SubmitAction,
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    UPDATE_DATA_FILES,
    UPDATE_DOC_FILES,
    UPDATE_SUBMISSION_ID,
    UPDATE_PATH,
    UPDATE_SUBMISSIONS_FOR_USER,
    UPDATE_SUBMISSIONSFILES_FOR_SUBMISSION,
    OPEN_SUBMISSION_FILES_DIALOG,
    CLOSE_SUBMISSION_FILES_DIALOG,
    OPEN_SUBMISSION_ISSUES_DIALOG,
    CLOSE_SUBMISSION_ISSUES_DIALOG,
    UPDATE_CURRENT_SUBMISSION,
    UPDATE_CURRENT_SUBMISSIONFILE,
    UPDATE_CURRENT_SUBMISSIONFILE_INDEX,
    CLEAR_SUBMISSION_FORM,
    SEND_SUBMISSION
} from "../actions/submissionActions";


const initialState = newSubmissionState();

export function submissionReducer(state: SubmissionState = initialState, action: SubmitAction) {
    switch (action.type) {
        case OPEN_SUBMIT_STEPS:
            return {...state, submissionOpen: true};
        case CLOSE_SUBMIT_STEPS:
            return {...state, submissionOpen: false};
        case OPEN_SUBMISSION_FILES_DIALOG:
            return {...state, submissionFilesDialogOpen: true};
        case CLOSE_SUBMISSION_FILES_DIALOG:
            return {...state, submissionFilesDialogOpen: false};
        case OPEN_SUBMISSION_ISSUES_DIALOG:
            return {...state, submissionIssuesDialogOpen: true};
        case CLOSE_SUBMISSION_ISSUES_DIALOG:
            return {...state, submissionIssuesDialogOpen: false};
        case UPDATE_SUBMISSION_ID:
            return {...state, submissionId: action.submissionId};
        case UPDATE_CURRENT_SUBMISSION:
            return {
                ...state,
                currentSubmissionId: action.currentSubmissionId,
                currentSubmissionFiles: action.currentSubmissionFiles,
            };
        case UPDATE_PATH:
            return {...state, path: action.path};
        case UPDATE_DATA_FILES:
            return {...state, dataFiles: action.dataFiles};
        case UPDATE_DOC_FILES:
            return {...state, docFiles: action.docFiles};
        case CLEAR_SUBMISSION_FORM:
            return {...state, docFiles: [], dataFiles: [], submissionId: '', path: ''};
        case UPDATE_SUBMISSIONS_FOR_USER:
            return {...state, foundSubmissions: action.submissions};
        case UPDATE_CURRENT_SUBMISSIONFILE:
            return {...state, currentSubmissionFile: action.currentSubmissionFile};
        case UPDATE_CURRENT_SUBMISSIONFILE_INDEX:
            return {...state, currentSubmissionFileIndex: action.currentSubmissionFileIndex};
        case UPDATE_SUBMISSIONSFILES_FOR_SUBMISSION:
            return {...state, currentSubmissionFiles: action.submissionFiles};
        case SEND_SUBMISSION:
            return {...state, currentDatasetValidationResults: action.currentDatasetValidationResults};
        default:
            return state;
    }
}