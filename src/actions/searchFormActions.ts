import { Dispatch } from 'redux';

import { MessageLogAction, postMessage } from './messageLogActions'
import { QueryResult, SearchHistoryItem } from '../types/dataset';
import { AppState } from '../states/appState';
import * as api from '../api'
import { DatasetQuery } from '../api/searchDatasets';


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

export function searchDatasets() {
    return (dispatch: Dispatch<UpdateFoundDatasets | MessageLogAction | UpdateSearchHistory | StopLoading>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        let datasetQuery = state.searchFormState.datasetQuery;
        const selectedBounds = state.searchMapState.selectedBounds;
        if (selectedBounds) {
            datasetQuery = {...datasetQuery, region: selectedBounds.toBBoxString()};
        }

        const left = state.advancedSearchState.left;
        const bottom = state.advancedSearchState.bottom;
        const right = state.advancedSearchState.right;
        const top = state.advancedSearchState.top;

        if(left>0 && bottom>0 && right>0 && top>0){
            datasetQuery = {...datasetQuery, region: `${left},${bottom},${right},${top}`};
        }

        datasetQuery = {...datasetQuery, count: state.dataTableState.rowsPerPage};
        datasetQuery = {...datasetQuery, offset: ((state.dataTableState.page * state.dataTableState.rowsPerPage) + 1)};

        datasetQuery = {...datasetQuery, geojson: true};

        let searchHistory = state.searchFormState.searchHistory;

        return api.searchDatasets(apiServerUrl, datasetQuery)
            .then((foundDatasets: QueryResult) => {
                dispatch(updateFoundDatasets(foundDatasets));
            })
            .then(() => {
                dispatch(updateSearchHistory(searchHistory));
            })
            .then(() => {
                dispatch(stopLoading());
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

export type SearchFormAction = UpdateDatasetQuery
    | UpdateFoundDatasets
    | UpdateSearchHistory
    | StartLoading
    | StopLoading;
