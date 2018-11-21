import { Dispatch } from 'redux';

import { MessageLogAction, postMessage } from './messageLogActions'
import { QueryResult } from '../types/dataset';
import { AppState } from '../states/appState';
import * as api from '../api'
import { DatasetQuery } from '../api/searchDatasets';

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

export function searchDatasets() {
    return (dispatch: Dispatch<UpdateFoundDatasets | MessageLogAction>, getState: () => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        let datasetQuery = state.searchFormState.datasetQuery;
        const selectedBounds = state.searchMapState.selectedBounds;
        if (selectedBounds) {
            datasetQuery = {...datasetQuery, region: selectedBounds.toBBoxString()};
        }
        datasetQuery = {...datasetQuery, count:state.dataTableState.rowsPerPage};
        datasetQuery = {...datasetQuery, offset:((state.dataTableState.page * state.dataTableState.rowsPerPage)+1)};

        api.searchDatasets(apiServerUrl, datasetQuery)
           .then((foundDatasets: QueryResult) => {
               dispatch(updateFoundDatasets(foundDatasets));
           })
           .catch(error => {
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
        type: UPDATE_FOUND_DATASETS, foundDatasets,
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type SearchFormAction = UpdateDatasetQuery | UpdateFoundDatasets;
