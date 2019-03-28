import { Dispatch } from 'redux';

import { MessageLogAction, postMessage } from './messageLogActions'
import { QueryResult } from '../model';
import { AppState } from '../states/appState';
import * as api from '../api'
import { DatasetQuery } from '../api/findDatasets';
import { LatLng, latLngBounds } from "leaflet";
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

    if (!state.sessionState.user){
        datasetQuery = {...datasetQuery, status: 'PUBLISHED'};
    }

    const selectedBoundsAdvanced = state.advancedSearchState.selectedBBox;

    if (selectedBoundsAdvanced) {
        if (selectedBoundsAdvanced[0] !== ''
            && selectedBoundsAdvanced[1] !== ''
            && selectedBoundsAdvanced[2] !== ''
            && selectedBoundsAdvanced[3] !== '') {

            const bnds1 = new LatLng(+selectedBoundsAdvanced[0], +selectedBoundsAdvanced[1]);
            const bnds2 = new LatLng(+selectedBoundsAdvanced[2], +selectedBoundsAdvanced[3]);
            const bbox = latLngBounds(bnds1, bnds2);

            datasetQuery = {...datasetQuery, region: bbox.toBBoxString()};
        }
    }

    const selectedWavelength = state.advancedSearchState.selectedWavelength;

    if (selectedWavelength !== "all") {
        datasetQuery = {...datasetQuery, wavelengthsMode: state.advancedSearchState.selectedWavelength};
    }

    const waterDepth = state.advancedSearchState.waterDepth;

    if (waterDepth) {
        if (waterDepth[0] !== undefined && waterDepth[1] !== undefined) {
            datasetQuery = {...datasetQuery, wdepth: state.advancedSearchState.waterDepth};
        }
    }

    const selectedProducts = state.advancedSearchState.selectedProducts;

    if (selectedProducts) {
        datasetQuery = {...datasetQuery, productNames: state.advancedSearchState.selectedProducts};
    }

    const selectedOptShallow = state.advancedSearchState.selectedOptShallow;

    if (selectedOptShallow) {
        datasetQuery = {...datasetQuery, shallow: state.advancedSearchState.selectedOptShallow};
    }

    datasetQuery = {...datasetQuery, count: state.dataTableState.rowsPerPage};
    datasetQuery = {...datasetQuery, offset: ((state.dataTableState.page * state.dataTableState.rowsPerPage) + 1)};

    datasetQuery = {...datasetQuery, geojson: true};

    const expression = datasetQuery.searchExpr;
    let newExpression = expression;

    if (expression) {
        if (expression.search(':') == -1) {
            newExpression = 'pathValue:*' + expression + '*';
        }

        datasetQuery = {...datasetQuery, searchExpr: newExpression};
    }

    return datasetQuery;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function searchDatasets() {
    return (dispatch: Dispatch<UpdateFoundDatasets | MessageLogAction | UpdateSearchHistory | StopLoading>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        let datasetQuery = state.searchFormState.datasetQuery;

        datasetQuery = collectDatasetQuery(state, datasetQuery);

        return api.findDatasets(apiServerUrl, datasetQuery)
            .then((foundDatasets: QueryResult) => {
                dispatch(updateFoundDatasets(foundDatasets));
                if (foundDatasets.total_count == 0){
                    dispatch(postMessage('warning', 'Empty Result'));
                }
                else {
                    dispatch(postMessage('success', foundDatasets.total_count + ' Datasets Found'));
                }
            })
            .then(() => {
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

export type SearchFormAction = UpdateDatasetQuery
    | UpdateFoundDatasets
    | UpdateSearchHistory
    | UpdateSelectedSearchHistory
    | StartLoading
    | StopLoading;
