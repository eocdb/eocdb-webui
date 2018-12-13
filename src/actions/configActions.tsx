import { Dispatch } from "redux";
import { MessageLogAction, postMessage } from "./messageLogActions";
import { AppState } from "../states/appState";
import * as api from '../api'
import { StoreInfo } from "../types/dataset";

export const CONFIGURE_API_SERVER = 'CONFIGURE_API_SERVER';
export type CONFIGURE_API_SERVER = typeof CONFIGURE_API_SERVER;

export interface ConfigureApiServer {
    type: CONFIGURE_API_SERVER;
    apiServerUrl: string;
    apiServerAuth: string;
}

export function configureApiServer(apiServerUrl: string, apiServerAuth: string): ConfigureApiServer {
    return {type: CONFIGURE_API_SERVER, apiServerUrl, apiServerAuth};
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
        const apiServerAuth = state.configState.apiServerAuth;

        api.getStoreInfo(apiServerUrl, apiServerAuth)
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



export type ConfigAction = ConfigureApiServer | UpdateInfo;