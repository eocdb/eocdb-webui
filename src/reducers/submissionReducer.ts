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
    UPDATE_SUBMISSION,
    OPEN_SUBMISSION_FILES_DIALOG,
    CLOSE_SUBMISSION_FILES_DIALOG,
    OPEN_SUBMISSION_ISSUES_DIALOG,
    CLOSE_SUBMISSION_ISSUES_DIALOG,
    UPDATE_CURRENT_SUBMISSIONFILE,
    UPDATE_CURRENT_SUBMISSIONFILE_INDEX,
    CLEAR_SUBMISSION_FORM,
    SEND_SUBMISSION,
    OPEN_DELETE_SUBMISSION_FILES_ALERT,
    CLOSE_DELETE_SUBMISSION_FILES_ALERT
} from "../actions/submissionActions";


const initialState = newSubmissionState();

export function submissionReducer(state: SubmissionState = initialState, action: SubmitAction) {
    switch (action.type) {
        case OPEN_SUBMIT_STEPS:
            return {...state, submissionDialogOpen: true};
        case CLOSE_SUBMIT_STEPS:
            return {...state, submissionDialogOpen: false};
        case OPEN_SUBMISSION_FILES_DIALOG:
            return {...state, submissionFilesDialogOpen: true};
        case CLOSE_SUBMISSION_FILES_DIALOG:
            return {...state, submissionFilesDialogOpen: false};
        case OPEN_SUBMISSION_ISSUES_DIALOG:
            return {...state, submissionFileIssueDialogOpen: true};
        case CLOSE_SUBMISSION_ISSUES_DIALOG:
            return {...state, submissionFileIssueDialogOpen: false};
        case OPEN_DELETE_SUBMISSION_FILES_ALERT:
            return {...state, deleteSubmissionFileAlertOpen: true};
        case CLOSE_DELETE_SUBMISSION_FILES_ALERT:
            return {...state, deleteSubmissionFileAlertOpen: false};
        case UPDATE_SUBMISSION_ID:
            return {...state, submissionId: action.submissionId};
        case UPDATE_SUBMISSION:
            return {...state, selectedSubmission: action.submission};
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
            return {...state, selectedSubmissionFile: action.currentSubmissionFile};
        case UPDATE_CURRENT_SUBMISSIONFILE_INDEX:
            return {...state, currentSubmissionFileIndex: action.currentSubmissionFileIndex};
        case SEND_SUBMISSION:
            return {...state, currentDatasetValidationResults: action.currentDatasetValidationResults};
        default:
            return state;
    }
}