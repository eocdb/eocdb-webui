import { Dispatch } from 'redux';

import { MessageLogAction, postMessage } from './messageLogActions'
import { DatasetRef } from '../types/dataset';
import { AppState } from '../states/appState';
import * as api from '../api'

export const UPDATE_FOUND_DATASETS = 'UPDATE_FOUND_DATASETS';
export type UPDATE_FOUND_DATASETS = typeof UPDATE_FOUND_DATASETS;

export interface UpdateFoundDatasets {
    type: UPDATE_FOUND_DATASETS;
    foundDatasets: DatasetRef[];
}

export function updateFoundDatasets(foundDatasets: DatasetRef[]): UpdateFoundDatasets {
    return {
        type: UPDATE_FOUND_DATASETS, foundDatasets,
    };
}

export function searchDatasets() {
    return (dispatch: Dispatch<UpdateFoundDatasets | MessageLogAction>, getState: () => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        let datasetQuery = state.searchFormState.datasetQuery;
        const selectedBounds = state.searchMapState.selectedBounds;
        if (selectedBounds) {
            datasetQuery = {...datasetQuery, region: selectedBounds.toBBoxString()};
        }
        api.searchDatasets(apiServerUrl, datasetQuery)
           .then((foundDatasets: DatasetRef[]) => {
               dispatch(updateFoundDatasets(foundDatasets));
           })
           .catch(error => {
               dispatch(postMessage('error', error + ''));
           });
    };
}

export type SearchFormAction = UpdateFoundDatasets;
