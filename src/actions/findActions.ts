import { Dispatch } from 'redux';

import { MessageLogAction, postMessage } from './messageLogActions'
import { DatasetQuery, QueryResult } from '../model';
import { AppState } from '../states/appState';
import * as api from '../api'
import { SearchHistoryItem } from "../types/dataset";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const START_LOADING = 'START_LOADING';
export type START_LOADING = typeof START_LOADING;

export interface StartLoading {
    type: START_LOADING;
    loading: boolean;
}

export function startLoading(): StartLoading {
    return {
        type: START_LOADING,
        loading: true,
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const STOP_LOADING = 'STOP_LOADING';
export type STOP_LOADING = typeof STOP_LOADING;

export interface StopLoading {
    type: STOP_LOADING;
    loading: boolean;
}

export function stopLoading(): StopLoading {
    return {
        type: STOP_LOADING,
        loading: false,
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_DATASET_QUERY = 'UPDATE_DATASET_QUERY';
export type UPDATE_DATASET_QUERY = typeof UPDATE_DATASET_QUERY;

export interface UpdateDatasetQuery {
    type: UPDATE_DATASET_QUERY;
    datasetQuery: DatasetQuery;
}

export function updateDatasetQuery(datasetQuery: DatasetQuery): UpdateDatasetQuery {
    return {
        type: UPDATE_DATASET_QUERY, datasetQuery,
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const UPDATE_SEARCH_HISTORY = 'UPDATE_SEARCH_HISTORY';
export type UPDATE_SEARCH_HISTORY = typeof UPDATE_SEARCH_HISTORY;

export interface UpdateSearchHistory {
    type: UPDATE_SEARCH_HISTORY;
    searchHistory: SearchHistoryItem[];
}

export function updateSearchHistory(searchHistory: SearchHistoryItem[]): UpdateSearchHistory {
    return {
        type: UPDATE_SEARCH_HISTORY, searchHistory,
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const UPDATE_SELECTED_SEARCH_HISTORY = 'UPDATE_SELECTED_SEARCH_HISTORY';
export type UPDATE_SELECTED_SEARCH_HISTORY = typeof UPDATE_SELECTED_SEARCH_HISTORY;

export interface UpdateSelectedSearchHistory {
    type: UPDATE_SELECTED_SEARCH_HISTORY;
    selectedSearchHistory: SearchHistoryItem;
}


// noinspection JSUnusedGlobalSymbols
export function updateSelectedSearchHistory(selectedSearchHistory: SearchHistoryItem): UpdateSelectedSearchHistory {
    return {
        type: UPDATE_SELECTED_SEARCH_HISTORY, selectedSearchHistory,
    };
}


function collectDatasetQuery(state: AppState, datasetQuery: DatasetQuery): DatasetQuery {
    const selectedBounds = state.searchMapState.selectedBounds;

    if (selectedBounds) {
        datasetQuery = {...datasetQuery, region: selectedBounds.toBBoxString()};
    }
    else {
        //datasetQuery = {...datasetQuery, region: ''};
    }

    if (!state.sessionState.user) {
        datasetQuery = {...datasetQuery, status: 'PUBLISHED'};
    }

    datasetQuery = {...datasetQuery, count: state.dataTableState.rowsPerPage};
    datasetQuery = {...datasetQuery, offset: ((state.dataTableState.page * state.dataTableState.rowsPerPage) + 1)};

    datasetQuery = {...datasetQuery, geojson: true};

    const expression = datasetQuery.searchExpr;

    if (expression) {
        datasetQuery = {...datasetQuery, searchExpr: expression};
    }

    return datasetQuery;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function searchDatasets() {
    return (dispatch: Dispatch<UpdateFoundDatasets | MessageLogAction | UpdateSearchHistory | StopLoading
        | UpdateDatasetQuery>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        let datasetQuery = state.searchFormState.datasetQuery;

        datasetQuery = collectDatasetQuery(state, datasetQuery);
        const userId = state.sessionState.user ? state.sessionState.user.id : 0;

        return api.findDatasets(apiServerUrl, datasetQuery, userId)
            .then((foundDatasets: QueryResult) => {
                dispatch(updateFoundDatasets(foundDatasets));
                if (foundDatasets.total_count == 0) {
                    dispatch(postMessage('warning', 'Empty Result'));
                } else {
                    dispatch(postMessage('success', foundDatasets.total_count + ' Datasets Found'));
                }
            })
            .then(() => {
                dispatch(updateDatasetQuery(datasetQuery));
                dispatch(stopLoading());
                return 0;
            })
            .catch((error: string) => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_FOUND_DATASETS = 'UPDATE_FOUND_DATASETS';
export type UPDATE_FOUND_DATASETS = typeof UPDATE_FOUND_DATASETS;

export interface UpdateFoundDatasets {
    type: UPDATE_FOUND_DATASETS;
    foundDatasets: QueryResult;
}

export function updateFoundDatasets(foundDatasets: QueryResult): UpdateFoundDatasets {
    return {
        type: UPDATE_FOUND_DATASETS, foundDatasets
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SAVE_SEARCH_TITLE = 'UPDATE_SAVE_SEARCH_TITLE';
export type UPDATE_SAVE_SEARCH_TITLE = typeof UPDATE_SAVE_SEARCH_TITLE;

export interface UpdateSaveSearchTitle {
    type: UPDATE_SAVE_SEARCH_TITLE;
    saveSearchTitle: string;
}

export function updateSaveSearchTitle(saveSearchTitle: string): UpdateSaveSearchTitle {
    return {
        type: UPDATE_SAVE_SEARCH_TITLE, saveSearchTitle
    };
}

export const UPDATE_TERMS = 'UPDATE_TERMS';
export type UPDATE_TERMS = typeof UPDATE_TERMS ;


export interface UpdateTerms {
    type: UPDATE_TERMS;
    terms: string;
}

// noinspection JSUnusedGlobalSymbols
export function updateTerms(terms: string): UpdateTerms {
    return {type: UPDATE_TERMS, terms};
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type SearchFormAction = UpdateDatasetQuery
    | UpdateFoundDatasets
    | UpdateSearchHistory
    | UpdateSelectedSearchHistory
    | UpdateSaveSearchTitle
    | StartLoading
    | StopLoading
    | UpdateTerms;
