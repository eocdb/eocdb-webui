import * as api from '../api'
import { DatasetRef } from '../types/dataset';
import { Dispatch } from 'react';
import { AppState } from '../types/appState';

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
        const searchFormState = state.searchFormState;
        const selectedRegions = state.searchMapState.selectedRegions;
        api.searchDatasets({...searchFormState, selectedRegions})
           .then((foundDatasets: DatasetRef[]) => {
               dispatch(updateFoundDatasets(foundDatasets));
           })
           .catch(e => {
               /* TODO: handle error */
           });
    };
}

export type SearchFormAction = UpdateFoundDatasets;
