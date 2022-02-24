import { Dispatch } from "redux";
import * as api from '../api'
import { postMessage, MessageLogAction } from "./messageLogActions";
import { AppState } from "../states/appState";
import { DatasetValidationResult, UploadData, Submission, SubmissionFile } from "../model";
import { StopLoading, UpdateSearchHistory } from "./findActions";
import { SingleUpload } from "../model/UploadData";
import { MessageLogEntry } from "../states/messageLogState";
import { SubmissionQuery, SubmissionResult } from "../model/Submission";


/**
 * @file submissionActions.ts
 * @brief Actions for submitting data files (SubmissionPanel.tsx)
 * @author: Brockmann Consult
 * @date 14/01/2019
 */


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_SUBMISSION_FILES_DIALOG = 'OPEN_SUBMISSION_FILES_DIALOG';
export type OPEN_SUBMISSION_FILES_DIALOG = typeof OPEN_SUBMISSION_FILES_DIALOG;


export interface OpenSubmissionFilesDialog {
    type: OPEN_SUBMISSION_FILES_DIALOG;
}

export function openSubmissionFilesDialog(): OpenSubmissionFilesDialog {
    return {
        type: OPEN_SUBMISSION_FILES_DIALOG
    }
}


export const CLOSE_SUBMISSION_FILES_DIALOG = 'CLOSE_SUBMISSION_FILES_DIALOG';
export type CLOSE_SUBMISSION_FILES_DIALOG = typeof CLOSE_SUBMISSION_FILES_DIALOG;


export interface CloseSubmissionFilesDialog {
    type: CLOSE_SUBMISSION_FILES_DIALOG;
}

export function closeSubmissionFilesDialog(): CloseSubmissionFilesDialog {
    return {
        type: CLOSE_SUBMISSION_FILES_DIALOG
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_SUBMISSION_META_DIALOG = 'OPEN_SUBMISSION_META_DIALOG';
export type OPEN_SUBMISSION_META_DIALOG = typeof OPEN_SUBMISSION_META_DIALOG;


export interface OpenSubmissionMetaDialog {
    type: OPEN_SUBMISSION_META_DIALOG;
}

export function openSubmissionMetaDialog(): OpenSubmissionMetaDialog {
    return {
        type: OPEN_SUBMISSION_META_DIALOG
    }
}


export const CLOSE_SUBMISSION_META_DIALOG = 'CLOSE_SUBMISSION_META_DIALOG';
export type CLOSE_SUBMISSION_META_DIALOG = typeof CLOSE_SUBMISSION_META_DIALOG;


export interface CloseSubmissionMetaDialog {
    type: CLOSE_SUBMISSION_META_DIALOG;
}

export function closeSubmissionMetaDialog(): CloseSubmissionMetaDialog {
    return {
        type: CLOSE_SUBMISSION_META_DIALOG
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_SUBMISSION_ISSUES_DIALOG = 'OPEN_SUBMISSION_ISSUES_DIALOG';
export type OPEN_SUBMISSION_ISSUES_DIALOG = typeof OPEN_SUBMISSION_ISSUES_DIALOG;


export interface OpenSubmissionIssuesDialog {
    type: OPEN_SUBMISSION_ISSUES_DIALOG;
}

export function openSubmissionIssuesDialog(): OpenSubmissionIssuesDialog {
    return {
        type: OPEN_SUBMISSION_ISSUES_DIALOG
    }
}


export const CLOSE_SUBMISSION_ISSUES_DIALOG = 'CLOSE_SUBMISSION_ISSUES_DIALOG';
export type CLOSE_SUBMISSION_ISSUES_DIALOG = typeof CLOSE_SUBMISSION_ISSUES_DIALOG;


export interface CloseSubmissionIssuesDialog {
    type: CLOSE_SUBMISSION_ISSUES_DIALOG;
}

export function closeSubmissionIssuesDialog(): CloseSubmissionIssuesDialog {
    return {
        type: CLOSE_SUBMISSION_ISSUES_DIALOG
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_DELETE_SUBMISSION_FILES_ALERT = 'OPEN_DELETE_SUBMISSION_FILES_ALERT';
export type OPEN_DELETE_SUBMISSION_FILES_ALERT = typeof OPEN_DELETE_SUBMISSION_FILES_ALERT;


export interface OpenDeleteSubmissionFilesAlert {
    type: OPEN_DELETE_SUBMISSION_FILES_ALERT;
}

export function openDeleteSubmissionFilesAlert(): OpenDeleteSubmissionFilesAlert {
    return {
        type: OPEN_DELETE_SUBMISSION_FILES_ALERT
    }
}


export const CLOSE_DELETE_SUBMISSION_FILES_ALERT = 'CLOSE_DELETE_SUBMISSION_FILES_ALERT';
export type CLOSE_DELETE_SUBMISSION_FILES_ALERT = typeof CLOSE_DELETE_SUBMISSION_FILES_ALERT;


export interface CloseDeleteSubmissionFilesAlert {
    type: CLOSE_DELETE_SUBMISSION_FILES_ALERT;
}

export function closeDeleteSubmissionFilesAlert(): CloseDeleteSubmissionFilesAlert {
    return {
        type: CLOSE_DELETE_SUBMISSION_FILES_ALERT
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_DELETE_SUBMISSION_ALERT = 'OPEN_DELETE_SUBMISSION_ALERT';
export type OPEN_DELETE_SUBMISSION_ALERT = typeof OPEN_DELETE_SUBMISSION_ALERT;


export interface OpenDeleteSubmissionAlert {
    type: OPEN_DELETE_SUBMISSION_ALERT;
}

export function openDeleteSubmissionAlert(): OpenDeleteSubmissionAlert {
    return {
        type: OPEN_DELETE_SUBMISSION_ALERT
    }
}


export const CLOSE_DELETE_SUBMISSION_ALERT = 'CLOSE_DELETE_SUBMISSION_ALERT';
export type CLOSE_DELETE_SUBMISSION_ALERT = typeof CLOSE_DELETE_SUBMISSION_ALERT;


export interface CloseDeleteSubmissionAlert {
    type: CLOSE_DELETE_SUBMISSION_ALERT;
}

export function closeDeleteSubmissionAlert(): CloseDeleteSubmissionAlert {
    return {
        type: CLOSE_DELETE_SUBMISSION_ALERT
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_UPLOAD_SUBMISSION_FILE_DIALOG = 'OPEN_UPLOAD_SUBMISSION_FILE_DIALOG';
export type OPEN_UPLOAD_SUBMISSION_FILE_DIALOG = typeof OPEN_UPLOAD_SUBMISSION_FILE_DIALOG;


export interface OpenUploadSubmissionFileDialog {
    type: OPEN_UPLOAD_SUBMISSION_FILE_DIALOG;
}

export function openUploadSubmissionFileDialog(): OpenUploadSubmissionFileDialog {
    return {
        type: OPEN_UPLOAD_SUBMISSION_FILE_DIALOG
    }
}


export const CLOSE_UPLOAD_SUBMISSION_FILE_DIALOG = 'CLOSE_UPLOAD_SUBMISSION_FILE_DIALOG';
export type CLOSE_UPLOAD_SUBMISSION_FILE_DIALOG = typeof CLOSE_UPLOAD_SUBMISSION_FILE_DIALOG;


export interface CloseUploadSubmissionFileDialog {
    type: CLOSE_UPLOAD_SUBMISSION_FILE_DIALOG;
}

export function closeUploadSubmissionFileDialog(): CloseUploadSubmissionFileDialog {
    return {
        type: CLOSE_UPLOAD_SUBMISSION_FILE_DIALOG
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_SUBMISSION_PUBLICATION_DATE_DIALOG = 'OPEN_SUBMISSION_PUBLICATION_DATE_DIALOG';
export type OPEN_SUBMISSION_PUBLICATION_DATE_DIALOG = typeof OPEN_SUBMISSION_PUBLICATION_DATE_DIALOG;


export interface OpenSubmissionPublicationDateDialog {
    type: OPEN_SUBMISSION_PUBLICATION_DATE_DIALOG;
}

export function openSubmissionPublicationDateDialog(): OpenSubmissionPublicationDateDialog {
    return {
        type: OPEN_SUBMISSION_PUBLICATION_DATE_DIALOG
    }
}


export const CLOSE_SUBMISSION_PUBLICATION_DATE_DIALOG = 'CLOSE_SUBMISSION_PUBLICATION_DATE_DIALOG';
export type CLOSE_SUBMISSION_PUBLICATION_DATE_DIALOG = typeof CLOSE_SUBMISSION_PUBLICATION_DATE_DIALOG;


export interface CloseSubmissionPublicationDateDialog {
    type: CLOSE_SUBMISSION_PUBLICATION_DATE_DIALOG;
}

export function closeSubmissionPublicationDateDialog(): CloseSubmissionPublicationDateDialog {
    return {
        type: CLOSE_SUBMISSION_PUBLICATION_DATE_DIALOG
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_SUBMIT_STEPS = 'CLOSE_SUBMIT_STEPS';
export type CLOSE_SUBMIT_STEPS = typeof CLOSE_SUBMIT_STEPS;


export interface CloseSubmitSteps {
    type: CLOSE_SUBMIT_STEPS;
}


/**
 * Close/cancel the file submit process
 */
export function closeSubmitSteps(): CloseSubmitSteps {
    return {type: CLOSE_SUBMIT_STEPS};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_SUBMIT_STEPS = 'OPEN_SUBMIT_STEPS';
export type OPEN_SUBMIT_STEPS = typeof OPEN_SUBMIT_STEPS;

export interface OpenSubmitSteps {
    type: OPEN_SUBMIT_STEPS;
}

/**
 * Open the file submit process
 */
export function openSubmitSteps(): OpenSubmitSteps {
    return {type: OPEN_SUBMIT_STEPS};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SUBMISSION_ID = 'UPDATE_SUBMISSION_ID';
export type UPDATE_SUBMISSION_ID = typeof UPDATE_SUBMISSION_ID;

export interface UpdateSubmissionId {
    type: UPDATE_SUBMISSION_ID;
    submissionId: string;
}

export function updateSubmissionId(submissionId: string): UpdateSubmissionId {
    return {
        type: UPDATE_SUBMISSION_ID,
        submissionId
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_PATH = 'UPDATE_PATH';
export type UPDATE_PATH = typeof UPDATE_PATH;

export interface UpdatePath {
    type: UPDATE_PATH;
    path: string;
}

export function updatePath(path: string): UpdatePath {
    return {
        type: UPDATE_PATH,
        path
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_PUBLICATION_DATE = 'UPDATE_PUBLICATION_DATE';
export type UPDATE_PUBLICATION_DATE = typeof UPDATE_PUBLICATION_DATE;

export interface UpdatePublicationDate {
    type: UPDATE_PUBLICATION_DATE;
    publicationDate: string|null;
}

export function updatePublicationDate(publicationDate: string|null): UpdatePublicationDate {
    return {
        type: UPDATE_PUBLICATION_DATE,
        publicationDate
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_DATA_FILES = 'UPDATE_DATA_FILES';
export type UPDATE_DATA_FILES = typeof UPDATE_DATA_FILES;

export interface UpdateDataFiles {
    type: UPDATE_DATA_FILES;
    dataFiles: File[];
}

export function updateDataFiles(dataFiles: File[]): UpdateDataFiles {
    return {
        type: UPDATE_DATA_FILES,
        dataFiles
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_DOC_FILES = 'UPDATE_DOC_FILES';
export type UPDATE_DOC_FILES = typeof UPDATE_DOC_FILES;

export interface UpdateDocFiles {
    type: UPDATE_DOC_FILES;
    docFiles: File[];
}

export function updateDocFiles(docFiles: File[]): UpdateDocFiles {
    return {
        type: UPDATE_DOC_FILES,
        docFiles
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_ALLOW_PUBLICATION = 'UPDATE_ALLOW_PUBLICATION';
export type UPDATE_ALLOW_PUBLICATION = typeof UPDATE_ALLOW_PUBLICATION;

export interface UpdateAllowPublication {
    type: UPDATE_ALLOW_PUBLICATION;
    allowPublication: boolean;
}

export function updateAllowPublication(allowPublication: boolean): UpdateAllowPublication {
    return {
        type: UPDATE_ALLOW_PUBLICATION,
        allowPublication
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const CLEAR_SUBMISSION_FORM = 'CLEAR_SUBMISSION_FORM';
export type CLEAR_SUBMISSION_FORM = typeof CLEAR_SUBMISSION_FORM;

export interface ClearSubmissionForm {
    type: CLEAR_SUBMISSION_FORM;
}

export function clearSubmissionForm(): ClearSubmissionForm {
    return {
        type: CLEAR_SUBMISSION_FORM,
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SEND_SUBMISSION = 'SEND_SUBMISSION';
export type SEND_SUBMISSION = typeof SEND_SUBMISSION;

export interface SendSubmission {
    type: SEND_SUBMISSION;
    currentDatasetValidationResults: DatasetValidationResult[];
}


export function _sendSubmission(currentDatasetValidationResults: DatasetValidationResult[]): SendSubmission {
    return {
        type: SEND_SUBMISSION,
        currentDatasetValidationResults: currentDatasetValidationResults
    }
}

export const UPDATE_SUBMISSION_SUCCEEDED = 'UPDATE_SUBMISSION_SUCCEEDED';
export type UPDATE_SUBMISSION_SUCCEEDED = typeof UPDATE_SUBMISSION_SUCCEEDED;

export interface UpdateSubmissionSucceeded {
    type: UPDATE_SUBMISSION_SUCCEEDED;
    submissionSucceeded: boolean;
}

export function _updateSubmissionSucceeded(submissionSucceeded: boolean): UpdateSubmissionSucceeded{

    return {
        type: UPDATE_SUBMISSION_SUCCEEDED,
        submissionSucceeded
    }
}

export function sendSubmission() {
    return (dispatch: Dispatch<SubmitAction | MessageLogAction | UpdateSubmissionSucceeded | CloseSubmissionFilesDialog
        | UpdateSearchHistory | StopLoading>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        const user = state.sessionState.user;

        const userid = user ? user.id : null;

        const username = user ? user.name : '';

        const uploadData: UploadData = {
            dataFiles: state.submissionState.dataFiles,
            docFiles: state.submissionState.docFiles,
            submissionId: state.submissionState.submissionId,
            path: state.submissionState.path,
            publicationDate: state.submissionState.publicationDate,
            allowPublication: state.submissionState.allowPublication,
            username: username,
            userId: userid,
        };

        return api.uploadStoreFiles(apiServerUrl, uploadData)
            .then((datasetValidationResults: DatasetValidationResult[]) => {
                dispatch(_sendSubmission(datasetValidationResults));
                dispatch(postMessage("success", 'Submission Sent'));
                dispatch(closeSubmitSteps());
            })
            .then(() => {
                api.getSubmissionsForUser(apiServerUrl)
                    .then((submissionResult: SubmissionResult) => {
                        dispatch(updateSubmissionsForUser(submissionResult));
                    })
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UPDATE_SUBMISSION_QUERY = 'UPDATE_SUBMISSION_QUERY';
export type UPDATE_SUBMISSION_QUERY = typeof UPDATE_SUBMISSION_QUERY;


export interface UpdateSubmissionQuery {
    type: UPDATE_SUBMISSION_QUERY;
    submissionQuery: SubmissionQuery;
}


export function updateSubmissionQuery(query: SubmissionQuery): UpdateSubmissionQuery {
    return {
        type: UPDATE_SUBMISSION_QUERY,
        submissionQuery: query
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SUBMISSIONS_FOR_USER = 'UPDATE_SUBMISSIONS_FOR_USER';
export type UPDATE_SUBMISSIONS_FOR_USER = typeof UPDATE_SUBMISSIONS_FOR_USER;

export interface UpdateSubmissionsForUser {
    type: UPDATE_SUBMISSIONS_FOR_USER;
    submissionResult: SubmissionResult;
}


export function updateSubmissionsForUser(submissionResult: SubmissionResult): UpdateSubmissionsForUser {
    return {
        type: UPDATE_SUBMISSIONS_FOR_USER,
        submissionResult
    }
}


export function getSubmissionsForUser() {
    return (dispatch: Dispatch<UpdateSubmissionsForUser | UpdateSubmissionQuery| MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const submissionQuery = state.submissionState.submissionQuery;

        return api.getSubmissionsForUser(apiServerUrl, submissionQuery)
            .then((submissionResult: SubmissionResult) => {
                dispatch(updateSubmissionsForUser(submissionResult));
            })
            .then(() => {
                dispatch(postMessage("success", 'Submissions Loaded'));
                dispatch(updateSubmissionQuery({...submissionQuery, loading: false}));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
                dispatch(updateSubmissionsForUser({submissions: [], tot_count: 0}));
            });
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UPDATE_CURRENT_SUBMISSIONFILE_INDEX = 'UPDATE_CURRENT_SUBMISSIONFILE_INDEX';
export type UPDATE_CURRENT_SUBMISSIONFILE_INDEX = typeof UPDATE_CURRENT_SUBMISSIONFILE_INDEX;

export interface UpdateCurrentSubmissionFileIndex {
    type: UPDATE_CURRENT_SUBMISSIONFILE_INDEX;
    currentSubmissionFileIndex: number;
}

export function updateCurrentSubmissionFileIndex(currentSubmissionFileIndex: number)
    : UpdateCurrentSubmissionFileIndex {
    return {
        type: UPDATE_CURRENT_SUBMISSIONFILE_INDEX,
        currentSubmissionFileIndex,
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UPDATE_SELECTED_SUBMISSIONFILE = 'UPDATE_SELECTED_SUBMISSIONFILE';
export type UPDATE_SELECTED_SUBMISSIONFILE = typeof UPDATE_SELECTED_SUBMISSIONFILE;

export interface UpdateSelectedSubmissionFile {
    type: UPDATE_SELECTED_SUBMISSIONFILE;
    selectedSubmissionFile: SubmissionFile;
}

export function updateSelectedSubmissionFile(selectedSubmissionFile: SubmissionFile)
    : UpdateSelectedSubmissionFile {
    return {
        type: UPDATE_SELECTED_SUBMISSIONFILE,
        selectedSubmissionFile: selectedSubmissionFile,
    }
}


export function getSubmissionFile(submissionId: string, submissionFileIndex: number) {
    return (dispatch: Dispatch<UpdateSelectedSubmissionFile | MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        return api.getSubmissionFile(apiServerUrl, submissionId, submissionFileIndex)
            .then((submissionFile: SubmissionFile) => {
                dispatch(updateSelectedSubmissionFile(submissionFile));
            })
            .then(() => {
                dispatch(postMessage('success', 'Submission File Loaded'))
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function updateSubmissionFile(submissionFile: SubmissionFile, uploadData: SingleUpload) {
    return (dispatch: Dispatch<UpdateSubmission  | UpdateSubmissionQuery | UpdateSubmissionsForUser | MessageLogAction>,
            getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const submissionQuery = state.submissionState.submissionQuery;

        return api.updateSubmissionFile(apiServerUrl, submissionFile, uploadData)
            .then(() => {
                api.getSubmission(apiServerUrl, submissionFile.submission_id)
                    .then((submission: Submission) => {
                        dispatch(updateSubmission(submission));
                    })
            })
            .then(() => {
                return api.getSubmissionsForUser(apiServerUrl)
                    .then((submissionResult: SubmissionResult) => {
                        dispatch(updateSubmissionsForUser(submissionResult));
                        dispatch(updateSubmissionQuery({...submissionQuery, loading: false}));
                    })
            })
            .then(() => {
                dispatch(postMessage('success', 'Submission File Uploaded'))
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SUBMISSION = 'UPDATE_SUBMISSION';
export type UPDATE_SUBMISSION = typeof UPDATE_SUBMISSION;

export interface UpdateSubmission {
    type: UPDATE_SUBMISSION;
    submission: Submission;
}

export function updateSubmission(submission: Submission): UpdateSubmission {
    return {
        type: UPDATE_SUBMISSION,
        submission: submission,
    }
}

export function getSubmission(submissionId: string) {
    return (dispatch: Dispatch<UpdateSubmission | UpdateSubmissionQuery | UpdateSubmissionsForUser | MessageLogAction>,
            getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const submissionQuery = state.submissionState.submissionQuery;

        const user = state.sessionState.user;

        let userid = null;
        if (user) {
            userid = user.id;
        }

        return api.getSubmission(apiServerUrl, submissionId)
            .then((submission: Submission) => {
                dispatch(updateSubmission(submission));
            })
            .then(() => {
                return api.getSubmissionsForUser(apiServerUrl, userid)
                    .then((submissionResult: SubmissionResult) => {
                        dispatch(updateSubmissionsForUser(submissionResult));
                        dispatch(updateSubmissionQuery({...submissionQuery, loading: false}));
                    })
            })
            .then(() => {
                dispatch(postMessage('success', 'Submission Loaded'))
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function deleteSubmission(submissionId: string) {
    return (dispatch: Dispatch<UpdateSubmissionsForUser | UpdateSubmissionQuery | MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const submissionQuery = state.submissionState.submissionQuery;

        return api.deleteSubmission(apiServerUrl, submissionId)
            .then(() => {
                api.getSubmissionsForUser(apiServerUrl)
                    .then((submissionResult: SubmissionResult) => {
                        dispatch(updateSubmissionsForUser(submissionResult));
                        dispatch(updateSubmissionQuery({...submissionQuery, loading: false}));
                    })
            })
            .then(() => {
                dispatch(postMessage("success", 'Submission ' + submissionId + ' Deleted'));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const SET_SUBMISSION_STATUS = 'SET_SUBMISSION_STATUS';
export type SET_SUBMISSION_STATUS = typeof SET_SUBMISSION_STATUS;

export interface SetSubmissionStatus {
    type: SET_SUBMISSION_STATUS;
    submissionId: string;
    status: string;
}


export function _setSubmissionStatus(submissionId: string, status: string): SetSubmissionStatus {
    return {
        type: SET_SUBMISSION_STATUS,
        submissionId,
        status,
    }
}

export function setSubmissionStatus(submissionId: string, status: string, appDate?: string | null) {
    return (dispatch: Dispatch<SetSubmissionStatus | UpdateSubmissionQuery | UpdateSubmissionsForUser |
        MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const submissionQuery = state.submissionState.submissionQuery;

        return api.setSubmissionStatus(apiServerUrl, submissionId, status, appDate)
            .then(() => {
                dispatch(postMessage("success", 'Status set to ' + status));
            })
            .then(() => {
                return api.getSubmissionsForUser(apiServerUrl)
                    .then((submissionResult: SubmissionResult) => {
                        dispatch(updateSubmissionsForUser(submissionResult));
                        dispatch(updateSubmissionQuery({...submissionQuery, loading: false}));
                    })
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


export function updateSubmissionMeta() {
    return (dispatch: Dispatch<SetSubmissionStatus | UpdateSubmissionQuery | UpdateSubmissionsForUser | MessageLogAction>,
            getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const submissionQuery = state.submissionState.submissionQuery;

        const submissionId = state.submissionState.selectedSubmission.submission_id;

        const uploadData = {
            submissionid: state.submissionState.submissionId,
            path: state.submissionState.path,
            publicationdate: state.submissionState.publicationDate,
            allowpublication: state.submissionState.allowPublication,
        };


        return api.updateSubmission(apiServerUrl, submissionId, uploadData)
            .then(() => {
                return dispatch(postMessage("success", 'Submission' + submissionId + ' updated.'));
            })
            .then(() => {
                return api.getSubmissionsForUser(apiServerUrl)
                    .then((submissionResult: SubmissionResult) => {
                        dispatch(updateSubmissionsForUser(submissionResult));
                        dispatch(updateSubmissionQuery({...submissionQuery, loading: false}));
                    })
            })
            .catch((error: string) => {
                return dispatch(postMessage('error', error + ''));
            });
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function deleteSubmissionFile(submissionId: string, submissionFileIndex: number) {
    return (dispatch: Dispatch<UpdateSubmission | UpdateSubmissionsForUser | UpdateSelectedSubmissionFile | MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        return api.deleteSubmissionFile(apiServerUrl, submissionId, submissionFileIndex)
            .then(() => {
                api.getSubmission(apiServerUrl, submissionId)
                    .then((submission: Submission) => {
                        dispatch(updateSubmission(submission));
                    })
            })
            .then(() => {
                dispatch(postMessage("success", 'File Deleted'));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SUBMISSION_PUBLICATION_DATE = 'UPDATE_SUBMISSION_PUBLICATION_DATE';
export type UPDATE_SUBMISSION_PUBLICATION_DATE = typeof UPDATE_SUBMISSION_PUBLICATION_DATE;


export interface UpdateSubmissionPublicationDate {
    type: UPDATE_SUBMISSION_PUBLICATION_DATE;
    submissionPublicationDate: string | null;
}

export function updateSubmissionPublicationDate(submissionPublicationDate: string | null): UpdateSubmissionPublicationDate {
    return {
        type: UPDATE_SUBMISSION_PUBLICATION_DATE,
        submissionPublicationDate
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

export function downloadSubmissionFile(submissionId: string, index: number) {
    return (dispatch: Dispatch<MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        return api.downloadSubmissionFile(apiServerUrl, submissionId, index)
            .then(() => {
                dispatch(postMessage("success", 'File Downloaded'));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_HELP_DIALOG = 'OPEN_HELP_DIALOG';
export type OPEN_HELP_DIALOG = typeof OPEN_HELP_DIALOG;

export interface OpenHelpDialog {
    type: OPEN_HELP_DIALOG;
}

export function openHelpDialog(): OpenHelpDialog {
    return {type: OPEN_HELP_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_HELP_DIALOG = 'CLOSE_HELP_DIALOG';
export type CLOSE_HELP_DIALOG = typeof CLOSE_HELP_DIALOG;

export interface CloseHelpDialog {
    type: CLOSE_HELP_DIALOG;
}

export function closeHelpDialog(): CloseHelpDialog {
    return {type: CLOSE_HELP_DIALOG};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SUBMISSION_MESSAGES = 'UPDATE_SUBMISSION_MESSAGES';
export type UPDATE_SUBMISSION_MESSAGES = typeof UPDATE_SUBMISSION_MESSAGES;

export interface UpdateSubmissionMessages {
    type: UPDATE_SUBMISSION_MESSAGES;
    submissionMessages: MessageLogEntry[];
}

export function updateSubmissionMessages(submissionMessages: MessageLogEntry[]): UpdateSubmissionMessages {
    return {
        type: UPDATE_SUBMISSION_MESSAGES,
        submissionMessages
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HIDE_SUBMISSION_MESSAGES = 'HIDE_SUBMISSION_MESSAGES';
export type HIDE_SUBMISSION_MESSAGES = typeof HIDE_SUBMISSION_MESSAGES;

export interface HideSubmissionMessages {
    type: HIDE_SUBMISSION_MESSAGES;
    messageId: number;
}

export function hideSubmissionMessages(messageId: number): HideSubmissionMessages {
    return {type: HIDE_SUBMISSION_MESSAGES, messageId};
}


export type SubmitAction = OpenSubmitSteps
    | CloseSubmitSteps
    | OpenSubmissionFilesDialog
    | CloseSubmissionFilesDialog
    | OpenSubmissionMetaDialog
    | CloseSubmissionMetaDialog
    | OpenSubmissionIssuesDialog
    | CloseSubmissionIssuesDialog
    | OpenDeleteSubmissionFilesAlert
    | CloseDeleteSubmissionFilesAlert
    | OpenDeleteSubmissionAlert
    | CloseDeleteSubmissionAlert
    | OpenUploadSubmissionFileDialog
    | CloseUploadSubmissionFileDialog
    | OpenSubmissionPublicationDateDialog
    | CloseSubmissionPublicationDateDialog
    | UpdateSubmissionId
    | UpdatePath
    | UpdatePublicationDate
    | UpdateAllowPublication
    | UpdateDataFiles
    | UpdateDocFiles
    | ClearSubmissionForm
    | UpdateSubmissionsForUser
    | UpdateSubmission
    | SendSubmission
    | UpdateSubmissionPublicationDate
    | UpdateSelectedSubmissionFile
    | UpdateCurrentSubmissionFileIndex
    | OpenHelpDialog
    | CloseHelpDialog
    | UpdateSubmissionSucceeded
    | UpdateSubmissionMessages
    | HideSubmissionMessages
    | UpdateSubmissionQuery;
