import { Dispatch } from "redux";
import * as api from '../api'
import { postMessage, MessageLogAction } from "./messageLogActions";
import { AppState } from "../states/appState";
import { DatasetValidationResult, UploadData } from "../api/uploadStoreFiles";
import { StopLoading, UpdateSearchHistory } from "./searchFormActions";
import { SubmissionForUserResult } from "../api/getSubmissionFilesForUser";

/**
 * @file submitActions.ts
 * @brief Actions for submitting data files (SubmissionPanel.tsx)
 * @author: Brockmann Consult
 * @date 14/01/2019
 */


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


export const CLEAR_FORM = 'CLEAR_FORM';
export type CLEAR_FORM = typeof CLEAR_FORM;

export interface ClearForm {
    type: CLEAR_FORM;
}

export function clearForm(): ClearForm {
    return {
        type: CLEAR_FORM,
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SUBMIT_FILES = 'SUBMIT_FILES';
export type SUBMIT_FILES = typeof SUBMIT_FILES;

export interface SubmitFiles {
    type: SUBMIT_FILES;
    datasetValidationResults: DatasetValidationResult[];
}


export function _submitFiles(datasetValidationResults: DatasetValidationResult[]): SubmitFiles {
    return {
        type: SUBMIT_FILES,
        datasetValidationResults
    }
}


export function submitFiles() {
    return (dispatch: Dispatch<SubmitAction | MessageLogAction | UpdateSearchHistory | StopLoading>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        const uploadData: UploadData = {
            dataFiles: state.submitState.dataFiles,
            docFiles: state.submitState.docFiles,
            submissionId: state.submitState.submissionId,
            path: state.submitState.path,
        };

        return api.uploadStoreFiles(apiServerUrl, uploadData)
            .then((datasetValidationResults: DatasetValidationResult[]) => {
                dispatch(_submitFiles(datasetValidationResults));
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
    submissions: SubmissionForUserResult[];
}


export function _updateSubmissionsForUser(submissions: SubmissionForUserResult[]): UpdateSubmissionsForUser {
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

        return api.getSubmissionFilesForUser(apiServerUrl, userid)
            .then((submissions: SubmissionForUserResult[]) => {
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

export type SubmitAction = OpenSubmitSteps
    | CloseSubmitSteps
    | UpdateSubmissionId
    | UpdatePath
    | UpdateDataFiles
    | UpdateDocFiles
    | ClearForm
    | UpdateSubmissionsForUser
    | SubmitFiles;