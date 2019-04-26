import { Dispatch } from "redux";
import { MessageLogAction } from "./messageLogActions";
import { AppState } from "../states/appState";
import { UpdateFoundDatasets } from "./findActions";

import * as api from '../api'
import { Links } from "../model/Links";

export const OPEN_LINKS_CONTENT_DIALOG = 'OPEN_LINKS_CONTENT_DIALOG';
export type OPEN_LINKS_CONTENT_DIALOG = typeof OPEN_LINKS_CONTENT_DIALOG;

export interface OpenLinksContentDialog {
    type: OPEN_LINKS_CONTENT_DIALOG;
}

export function openLinksContentDialog(): OpenLinksContentDialog {
    return {type: OPEN_LINKS_CONTENT_DIALOG};
}

export const CLOSE_LINKS_CONTENT_DIALOG = 'CLOSE_LINKS_CONTENT_DIALOG ';
export type CLOSE_LINKS_CONTENT_DIALOG  = typeof CLOSE_LINKS_CONTENT_DIALOG ;

export interface CloseLinksContentDialog {
    type: CLOSE_LINKS_CONTENT_DIALOG ;
}

export function closeLinksContentDialog(): CloseLinksContentDialog  {
    return {type: CLOSE_LINKS_CONTENT_DIALOG };
}

export const UPDATE_LINKS_CONTENT = 'UPDATE_LINKS_CONTENT ';
export type UPDATE_LINKS_CONTENT  = typeof UPDATE_LINKS_CONTENT ;

export interface UpdateLinksContent {
    type: UPDATE_LINKS_CONTENT;
    linksContent: string;
}

export function updateLinksContent(linksContent: string): UpdateLinksContent  {
    return {type: UPDATE_LINKS_CONTENT, linksContent};
}


export function getLinks(){
    return (dispatch: Dispatch<UpdateFoundDatasets | MessageLogAction | UpdateLinksContent>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;

        return api.getLinks(apiServerUrl)
            .then((links: Links) => {
                return dispatch(updateLinksContent(links.content))
            })
    }
}


export const SAVE_LINKS_CONTENT = 'SAVE_LINKS_CONTENT ';
export type SAVE_LINKS_CONTENT  = typeof SAVE_LINKS_CONTENT ;

export interface SaveLinksContent {
    type: SAVE_LINKS_CONTENT;
    linksContent: string;
}

export function _saveLinksContent(linksContent: string): SaveLinksContent  {
    return {type: SAVE_LINKS_CONTENT, linksContent};
}


export function saveLinksContent(content: string){
    return (dispatch: Dispatch<UpdateFoundDatasets | MessageLogAction | SaveLinksContent>, getState: ()
        => AppState) => {
        const state = getState();
        const apiServerUrl = state.configState.apiServerUrl;
        return api.saveLinks(apiServerUrl, content)
            .then((links: Links) => {
                return dispatch(_saveLinksContent(links.content))
            })
    }
}



export type  AdminAction = OpenLinksContentDialog | CloseLinksContentDialog | UpdateLinksContent | SaveLinksContent;
