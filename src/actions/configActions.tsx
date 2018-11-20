import { Dispatch } from "redux";
import { MessageLogAction, postMessage } from "./messageLogActions";
import { AppState } from "../states/appState";
import * as api from '../api'
import { Info } from "../types/dataset";

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


export const GET_INFO = 'GET_INFO';
export type GET_INFO = typeof GET_INFO;

export interface UpdateInfo {
    type: GET_INFO;
    info: Info;
}


export function getInfo() {
    return (dispatch: Dispatch<UpdateInfo | MessageLogAction>, getState: () => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        api.getInfo(apiServerUrl)
            .then((foundInfo: Info) => {
                dispatch(_getInfo(foundInfo));
            })
            .catch(error => {
                dispatch(postMessage('error', error + ''));
            });
    };
}


export function _getInfo(info: Info): UpdateInfo {
    return {
        type: GET_INFO,
        info: info,
    };
}



////////////////////////////////////////////////////////////////////////////////////////////////



export type ConfigAction = SetAptServerUrl | UpdateInfo;