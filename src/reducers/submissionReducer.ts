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
    UPDATE_SELECTED_SUBMISSIONFILE,
    UPDATE_CURRENT_SUBMISSIONFILE_INDEX,
    CLEAR_SUBMISSION_FORM,
    SEND_SUBMISSION,
    OPEN_DELETE_SUBMISSION_FILES_ALERT,
    CLOSE_DELETE_SUBMISSION_FILES_ALERT,
    OPEN_DELETE_SUBMISSION_ALERT,
    CLOSE_DELETE_SUBMISSION_ALERT,
    OPEN_UPLOAD_SUBMISSION_FILE_DIALOG,
    CLOSE_UPLOAD_SUBMISSION_FILE_DIALOG,
    OPEN_SUBMISSION_PUBLICATION_DATE_DIALOG,
    CLOSE_SUBMISSION_PUBLICATION_DATE_DIALOG,
    UPDATE_SUBMISSION_PUBLICATION_DATE,
    UPDATE_PUBLICATION_DATE,
    UPDATE_ALLOW_PUBLICATION,
    CLOSE_HELP_DIALOG,
    OPEN_HELP_DIALOG,
    UPDATE_SUBMISSION_SUCCEEDED,
    UPDATE_SUBMISSION_MESSAGES,
    HIDE_SUBMISSION_MESSAGES, OPEN_SUBMISSION_META_DIALOG, CLOSE_SUBMISSION_META_DIALOG, UPDATE_SUBMISSION_QUERY
} from "../actions/submissionActions";



const initialState = newSubmissionState();

export function submissionReducer(state: SubmissionState = initialState, action: SubmitAction) {
    switch (action.type) {
        case OPEN_SUBMIT_STEPS:
            return {...state, submissionDialogOpen: true, submissionFilesDialogOpen: false};
        case CLOSE_SUBMIT_STEPS:
            return {...state, submissionDialogOpen: false};
        case OPEN_SUBMISSION_FILES_DIALOG:
            return {...state, submissionSucceeded: false, submissionFilesDialogOpen: true};
        case CLOSE_SUBMISSION_FILES_DIALOG:
            return {...state, submissionSucceeded: false, submissionFilesDialogOpen: false};
        case OPEN_SUBMISSION_META_DIALOG:
            return {...state, submissionMetaDialogOpen: true};
        case CLOSE_SUBMISSION_META_DIALOG:
            return {...state, submissionMetaDialogOpen: false};
        case OPEN_SUBMISSION_ISSUES_DIALOG:
            return {...state, submissionFileIssueDialogOpen: true};
        case CLOSE_SUBMISSION_ISSUES_DIALOG:
            return {...state, submissionFileIssueDialogOpen: false};
        case OPEN_DELETE_SUBMISSION_FILES_ALERT:
            return {...state, deleteSubmissionFileAlertOpen: true};
        case CLOSE_DELETE_SUBMISSION_FILES_ALERT:
            return {...state, deleteSubmissionFileAlertOpen: false};
        case OPEN_UPLOAD_SUBMISSION_FILE_DIALOG:
            return {...state, uploadSubmissionFileDialogOpen: true};
        case CLOSE_UPLOAD_SUBMISSION_FILE_DIALOG:
            return {...state, uploadSubmissionFileDialogOpen: false};
        case OPEN_SUBMISSION_PUBLICATION_DATE_DIALOG:
            return {...state, setSubmissionPublicationDateDialogOpen: true};
        case CLOSE_SUBMISSION_PUBLICATION_DATE_DIALOG:
            return {...state, setSubmissionPublicationDateDialogOpen: false};
        case OPEN_DELETE_SUBMISSION_ALERT:
            return {...state, deleteSubmissionAlertOpen: true};
        case CLOSE_DELETE_SUBMISSION_ALERT:
            return {...state, deleteSubmissionAlertOpen: false};
        case UPDATE_SUBMISSION_ID:
            return {...state, submissionId: action.submissionId};
        case UPDATE_SUBMISSION:
            return {...state,
                selectedSubmission: action.submission,
                submissionId: action.submission.submission_id,
                path: action.submission.path,
                publicationDate: action.submission.publication_date,
                allowPublication: action.submission.allow_publication,
            };
        case UPDATE_PATH:
            return {...state, path: action.path};
        case UPDATE_ALLOW_PUBLICATION:
            return {...state, allowPublication: action.allowPublication};
        case UPDATE_PUBLICATION_DATE:
            return {...state, publicationDate: action.publicationDate};
        case UPDATE_DATA_FILES:
            return {...state, dataFiles: action.dataFiles};
        case UPDATE_DOC_FILES:
            return {...state, docFiles: action.docFiles};
        case CLEAR_SUBMISSION_FORM:
            return {...state,
                docFiles: [],
                dataFiles: [],
                submissionId: '',
                path: '',
                publicationDate: null,
                allowPublication: false
            };
        case UPDATE_SUBMISSION_QUERY:
            return {...state, submissionQuery: action.submissionQuery}
        case UPDATE_SUBMISSIONS_FOR_USER:
            return {...state, foundSubmissions: action.submissions};
        case UPDATE_SELECTED_SUBMISSIONFILE:
            return {...state, selectedSubmissionFile: action.selectedSubmissionFile};
        case UPDATE_CURRENT_SUBMISSIONFILE_INDEX:
            return {...state, currentSubmissionFileIndex: action.currentSubmissionFileIndex};
        case SEND_SUBMISSION:
            return {...state, currentDatasetValidationResults: action.currentDatasetValidationResults};
        case OPEN_HELP_DIALOG:
            return {...state, helpDialogOpen: true};
        case CLOSE_HELP_DIALOG:
            return {...state, helpDialogOpen: false};
        case UPDATE_SUBMISSION_PUBLICATION_DATE:
            return {...state, submissionPublicationDate: action.submissionPublicationDate};
        case UPDATE_SUBMISSION_SUCCEEDED:
            return {...state, submissionSucceeded: action.submissionSucceeded};
        case UPDATE_SUBMISSION_MESSAGES:
            return {...state, submissionMessages: action.submissionMessages};
        case HIDE_SUBMISSION_MESSAGES:
            return {...state, submissionMessages: []};
        default:
            return state;
    }
}
