import { Dispatch } from "redux";
import { MessageLogAction, postMessage } from "./messageLogActions";
import { AppState } from "../states/appState";
import * as api from '../api'
import { StoreInfo } from "../types/dataset";

export const SET_API_SERVER_URL = 'SET_API_SERVER_URL';
export type SET_API_SERVER_URL = typeof SET_API_SERVER_URL;

export interface SetAptServerUrl {
    type: SET_API_SERVER_URL;
    apiServerUrl: string;
}

export function configServer(apiServerUrl: string): SetAptServerUrl {
    return {type: SET_API_SERVER_URL, apiServerUrl};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UPDATE_STORE_INFO = 'UPDATE_STORE_INFO';
export type UPDATE_STORE_INFO = typeof UPDATE_STORE_INFO;

export interface UpdateInfo {
    type: UPDATE_STORE_INFO;
    info: StoreInfo;
}


export function updateStoreInfo() {
    return (dispatch: Dispatch<UpdateInfo | MessageLogAction>, getState: () => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        api.getStoreInfo(apiServerUrl)
            .then((foundInfo: StoreInfo) => {
                dispatch(_updateStoreInfo(foundInfo));
            })
            .catch(error => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


export function _updateStoreInfo(info: StoreInfo): UpdateInfo {
    return {
        type: UPDATE_STORE_INFO,
        info: info,
    };
}



////////////////////////////////////////////////////////////////////////////////////////////////



export type ConfigAction = SetAptServerUrl | UpdateInfo;