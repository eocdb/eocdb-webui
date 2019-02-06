/**
* @file submitActions.ts
* @brief Actions for submitting data files (SubmitPanel.tsx)
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

export const UPDATE_DATA_FILES = 'UPDATE_DATA_FILES';
export type UPDATE_DATA_FILES = typeof UPDATE_DATA_FILES;

export interface UpdateDataFiles {
    type: UPDATE_DATA_FILES;
    dataFiles: File[];
}

export function updateDataFiles(dataFiles: File[]): UpdateDataFiles{
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

export function updateDocFiles(docFiles: File[]): UpdateDocFiles{
    return {
        type: UPDATE_DOC_FILES,
        docFiles
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SUBMIT_FILES = 'SUBMIT_FILES';
export type SUBMIT_FILES = typeof SUBMIT_FILES;

export interface SubmitFiles {
    type: SUBMIT_FILES;
    dataFiles: File[];
    docFiles: File[];
}


export function submitFiles(dataFiles: File[], docFiles: File[]): SubmitFiles {
    return {
        type: SUBMIT_FILES,
        dataFiles,
        docFiles,
    }
}


export type SubmitAction = OpenSubmitSteps
    | CloseSubmitSteps
    | UpdateDataFiles
    | UpdateDocFiles
    | SubmitFiles;