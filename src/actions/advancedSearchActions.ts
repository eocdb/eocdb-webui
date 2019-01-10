//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { AdvancedSearchItem } from "../types/advancedSearchDialog";

export const LOG_CHANGE = 'LOG_CHANGE';
export type LOG_CHANGE = typeof LOG_CHANGE;

export interface LogChange {
    type: LOG_CHANGE;
    filterLog: AdvancedSearchItem[];
}

export function logChange(filterLog: AdvancedSearchItem[]): LogChange {
    return {type: LOG_CHANGE, filterLog};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LEFT_CHANGE = 'LEFT_CHANGE';
export type LEFT_CHANGE = typeof LEFT_CHANGE;

export interface LeftChange {
    type: LEFT_CHANGE;
    left: number;
}

export function leftChange(left: number): LeftChange {
    return {type: LEFT_CHANGE, left};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const BOTTOM_CHANGE = 'BOTTOM_CHANGE';
export type BOTTOM_CHANGE = typeof BOTTOM_CHANGE;

export interface BottomChange {
    type: BOTTOM_CHANGE;
    bottom: number;
}

export function bottomChange(bottom: number): BottomChange {
    return {type: BOTTOM_CHANGE, bottom};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RIGHT_CHANGE = 'RIGHT_CHANGE';
export type RIGHT_CHANGE = typeof RIGHT_CHANGE;

export interface RightChange {
    type: RIGHT_CHANGE;
    right: number;
}

export function rightChange(right: number): RightChange {
    return {type: RIGHT_CHANGE, right};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const TOP_CHANGE = 'TOP_CHANGE';
export type TOP_CHANGE = typeof TOP_CHANGE;

export interface TopChange {
    type: TOP_CHANGE;
    top: number;
}

export function topChange(top: number): TopChange {
    return {type: TOP_CHANGE, top};
}

export type AdvancedSearchAction = LogChange | LeftChange | BottomChange | RightChange | TopChange;