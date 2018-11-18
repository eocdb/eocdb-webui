import { Dispatch } from 'redux';

import { DatasetRef } from '../types/dataset';
import { AppState } from '../types/appState';
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
    return (dispatch: Dispatch<UpdateFoundDatasets>, getState: () => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        const searchFormState = state.searchFormState;
        const selectedRegions = state.searchMapState.selectedRegions;
        api.searchDatasets(apiServerUrl, {...searchFormState, selectedRegions})
           .then((foundDatasets: DatasetRef[]) => {
               dispatch(updateFoundDatasets(foundDatasets));
           })
           .catch(e => {
               /* TODO: handle error */
           });
    };
}

export type SearchFormAction = UpdateFoundDatasets;
