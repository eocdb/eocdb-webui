import { Dataset } from "../types/dataset";
import { Dispatch } from "redux";
import { MessageLogAction, postMessage } from "./messageLogActions";
import { AppState } from "../states/appState";
import * as api from '../api'
import { PlotState } from "../states/dataTableState";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SELECTED_DATASETS = 'UPDATE_SELECTED_DATASETS';
export type UPDATE_SELECTED_DATASETS = typeof UPDATE_SELECTED_DATASETS;

export interface UpdateSelectedDatasets {
    type: UPDATE_SELECTED_DATASETS;
    selectedDatasets: string[];
}

export function updateSelectedDatasets(selectedDatasets: string[]): UpdateSelectedDatasets{
    return {type: UPDATE_SELECTED_DATASETS, selectedDatasets};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_DATA_PAGE = 'UPDATE_DATA_PAGE';
export type UPDATE_DATA_PAGE = typeof UPDATE_DATA_PAGE;

export interface UpdateDataPage {
    type: UPDATE_DATA_PAGE;
    page: number;
}

export function updateDataPage(selectedPage: number): UpdateDataPage{
    return {type: UPDATE_DATA_PAGE, page: selectedPage};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UPDATE_DATA_ROWS_PER_PAGE = 'UPDATE_DATA_ROWS_PER_PAGE';
export type UPDATE_DATA_ROWS_PER_PAGE = typeof UPDATE_DATA_ROWS_PER_PAGE;

export interface UpdateDataRowsPerPage {
    type: UPDATE_DATA_ROWS_PER_PAGE;
    rowsPerPage: number;
}

export function updateDataRowsPerPage (selectedRowsPerPage: number): UpdateDataRowsPerPage{
    return {type: UPDATE_DATA_ROWS_PER_PAGE, rowsPerPage: selectedRowsPerPage};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_METAINFO_DIALOG = 'OPEN_METAINFO_DIALOG';
export type OPEN_METAINFO_DIALOG = typeof OPEN_METAINFO_DIALOG;

export interface OpenMetaInfoDialog {
    type: OPEN_METAINFO_DIALOG;
}

export function openMetaInfoDialog (): OpenMetaInfoDialog{
    return {type: OPEN_METAINFO_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const CLOSE_METAINFO_DIALOG = 'CLOSE_METAINFO_DIALOG';
export type CLOSE_METAINFO_DIALOG = typeof CLOSE_METAINFO_DIALOG;

export interface CloseMetaInfoDialog {
    type: CLOSE_METAINFO_DIALOG;
}

export function closeMetaInfoDialog (): CloseMetaInfoDialog{
    return {type: CLOSE_METAINFO_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_PLOT_DIALOG = 'OPEN_PLOT_DIALOG ';
export type OPEN_PLOT_DIALOG  = typeof OPEN_PLOT_DIALOG ;

export interface OpenPlotDialog {
    type: OPEN_PLOT_DIALOG ;
}

export function openPlotDialog (): OpenPlotDialog{
    return {type: OPEN_PLOT_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const CLOSE_PLOT_DIALOG = 'CLOSE_PLOT_DIALOG ';
export type CLOSE_PLOT_DIALOG  = typeof CLOSE_PLOT_DIALOG ;

export interface ClosePlotDialog {
    type: CLOSE_PLOT_DIALOG ;
}

export function closePlotDialog (): ClosePlotDialog{
    return {type: CLOSE_PLOT_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UPDATE_DOWNLOAD_DOCS = 'UPDATE_DOWNLOAD_DOCS ';
export type UPDATE_DOWNLOAD_DOCS  = typeof UPDATE_DOWNLOAD_DOCS ;

export interface UpdateDownloadDocs {
    type: UPDATE_DOWNLOAD_DOCS;
    downloadDocs: boolean;
}

export function updateDownloadDocs (downloadDocs: boolean): UpdateDownloadDocs{
    return {type: UPDATE_DOWNLOAD_DOCS, downloadDocs};
}

//////////////////////////////////////////////////////////////////////////////

export const UPDATE_DATASET = 'UPDATE_DATASET';
export type UPDATE_DATASET = typeof UPDATE_DATASET;

export interface UpdateDataset {
    type: UPDATE_DATASET;
    dataset: Dataset;
}


export function updateDataset(datasetId: string) {
    return (dispatch: Dispatch<UpdateDataset | MessageLogAction>, getState: () => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        api.getDatasetById(apiServerUrl, datasetId)
            .then((foundDataset: Dataset) => {
                dispatch(_updateDataset(foundDataset));
            })
            .catch(error => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


export function _updateDataset(dataset: Dataset): UpdateDataset {
    return {
        type: UPDATE_DATASET,
        dataset: dataset,
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function downloadDatasets() {
    return (dispatch: Dispatch<UpdateSelectedDatasets | StopDownloading | MessageLogAction>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const datasetIds = state.dataTableState.selectedDatasets;
        const downloadDocs = state.dataTableState.downloadDocs;

        return api.downloadStoreFilesByIds(apiServerUrl, datasetIds, downloadDocs)
            .then(() => {
                dispatch(stopDownloading());
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const START_DOWNLOADING = 'START_DOWNLOADING';
export type START_DOWNLOADING = typeof START_DOWNLOADING;

export interface StartDownloading {
    type: START_DOWNLOADING;
    downloading: boolean;
}

export function startDownloading(): StartDownloading {
    return {
        type: START_DOWNLOADING,
        downloading: true,
    };
}


export const STOP_DOWNLOADING = 'STOP_DOWNLOADING';
export type STOP_DOWNLOADING = typeof STOP_DOWNLOADING;

export interface StopDownloading {
    type: STOP_DOWNLOADING;
    downloading: boolean;
}

export function stopDownloading(): StopDownloading {
    return {
        type: STOP_DOWNLOADING,
        downloading: false,
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UPDATE_PLOT_STATE = 'UPDATE_PLOT_STATE';
export type UPDATE_PLOT_STATE = typeof UPDATE_PLOT_STATE;

export interface UpdatePlotState {
    type: UPDATE_PLOT_STATE;
    plotState: PlotState;
}

export function updatePlotState(plotState: PlotState): UpdatePlotState {
    return {
        type: UPDATE_PLOT_STATE,
        plotState,
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type DataTableAction = UpdateDataPage
    | UpdateDataRowsPerPage
    | OpenMetaInfoDialog
    | CloseMetaInfoDialog
    | OpenMetaInfoDialog
    | CloseMetaInfoDialog
    | OpenPlotDialog
    | ClosePlotDialog
    | UpdateDataset
    | UpdateDownloadDocs
    | UpdateSelectedDatasets
    | StartDownloading
    | StopDownloading
    | UpdatePlotState;