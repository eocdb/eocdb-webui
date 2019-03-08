import { Dispatch } from "redux";
import * as api from '../api'
import { postMessage, MessageLogAction } from "./messageLogActions";
import { AppState } from "../states/appState";
import { DatasetValidationResult, UploadData, Submission, SubmissionFile } from "../model";
import { StopLoading, UpdateSearchHistory } from "./findActions";


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


export function sendSubmission() {
    return (dispatch: Dispatch<SubmitAction | MessageLogAction | UpdateSearchHistory | StopLoading>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        const uploadData: UploadData = {
            dataFiles: state.submissionState.dataFiles,
            docFiles: state.submissionState.docFiles,
            submissionId: state.submissionState.submissionId,
            path: state.submissionState.path,
        };

        return api.uploadStoreFiles(apiServerUrl, uploadData)
            .then((datasetValidationResults: DatasetValidationResult[]) => {
                dispatch(_sendSubmission(datasetValidationResults));
            })
            .then(() => {
                dispatch(postMessage("success", 'Files Loaded'));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SUBMISSIONS_FOR_USER = 'UPDATE_SUBMISSIONS_FOR_USER';
export type UPDATE_SUBMISSIONS_FOR_USER = typeof UPDATE_SUBMISSIONS_FOR_USER;

export interface UpdateSubmissionsForUser {
    type: UPDATE_SUBMISSIONS_FOR_USER;
    submissions: Submission[];
}


export function _updateSubmissionsForUser(submissions: Submission[]): UpdateSubmissionsForUser {
    return {
        type: UPDATE_SUBMISSIONS_FOR_USER,
        submissions
    }
}


export function updateSubmissionsForUser() {
    return (dispatch: Dispatch<UpdateSubmissionsForUser | MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const user = state.sessionState.user;

        let userid = 0;
        if (user) {
            userid = user.id;
        }

        return api.getSubmissionsForUser(apiServerUrl, userid)
            .then((submissions: Submission[]) => {
                dispatch(_updateSubmissionsForUser(submissions));
            })
            .then(() => {
                dispatch(postMessage("success", 'Files Loaded'));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
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


export const UPDATE_CURRENT_SUBMISSIONFILE = 'UPDATE_CURRENT_SUBMISSIONFILE';
export type UPDATE_CURRENT_SUBMISSIONFILE = typeof UPDATE_CURRENT_SUBMISSIONFILE;

export interface UpdateCurrentSubmissionFile {
    type: UPDATE_CURRENT_SUBMISSIONFILE;
    currentSubmissionFile: SubmissionFile;
}

export function _updateCurrentSubmissionFile(currentSubmissionFile: SubmissionFile)
    : UpdateCurrentSubmissionFile {
    return {
        type: UPDATE_CURRENT_SUBMISSIONFILE,
        currentSubmissionFile,
    }
}


export function updateSubmissionFile(submissionId: string, submissionFileIndex: number) {
    return (dispatch: Dispatch<UpdateCurrentSubmissionFile | MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        return api.getSubmissionFile(apiServerUrl, submissionId, submissionFileIndex)
            .then((submissionFile: SubmissionFile) => {
                dispatch(_updateCurrentSubmissionFile(submissionFile));
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

export const UPDATE_SUBMISSION = 'UPDATE_SUBMISSION';
export type UPDATE_SUBMISSION = typeof UPDATE_SUBMISSION;

export interface UpdateSubmission {
    type: UPDATE_SUBMISSION;
    submission: Submission;
}

export function _updateSubmission(submission: Submission): UpdateSubmission {
    return {
        type: UPDATE_SUBMISSION,
        submission: submission,
    }
}

export function updateSubmission(submissionId: string) {
    return (dispatch: Dispatch<UpdateSubmission | MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        //const submissionId = state.submissionState.submissionId;

        return api.getSubmission(apiServerUrl, submissionId)
            .then((submission: Submission) => {
                dispatch(_updateSubmission(submission));
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

export function setSubmissionStatus(submissionId: string, status: string) {
    return (dispatch: Dispatch<SetSubmissionStatus | MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        return api.setSubmissionStatus(apiServerUrl, submissionId, status)
            .then(() => {
                dispatch(postMessage("success", 'Status set to ' + status));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function deleteSubmissionFile(submissionId: string, submissionFileIndex: number) {
    return (dispatch: Dispatch<MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        return api.deleteSubmissionFile(apiServerUrl, submissionId, submissionFileIndex)
            .then(() => {
                dispatch(postMessage("success", 'File Deleted'));
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


export type SubmitAction = OpenSubmitSteps
    | CloseSubmitSteps
    | OpenSubmissionFilesDialog
    | CloseSubmissionFilesDialog
    | OpenSubmissionIssuesDialog
    | CloseSubmissionIssuesDialog
    | OpenDeleteSubmissionFilesAlert
    | CloseDeleteSubmissionFilesAlert
    | UpdateSubmissionId
    | UpdatePath
    | UpdateDataFiles
    | UpdateDocFiles
    | ClearSubmissionForm
    | UpdateSubmissionsForUser
    | UpdateSubmission
    | SendSubmission
    | UpdateCurrentSubmissionFile
    | UpdateCurrentSubmissionFileIndex;