import { GeoJsonObject } from 'geojson';
import { LatLngBounds } from 'leaflet';


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SELECTED_REGIONS = 'UPDATE_SELECTED_REGIONS';
export type UPDATE_SELECTED_REGIONS = typeof UPDATE_SELECTED_REGIONS;

export interface UpdateSelectedRegions {
    type: UPDATE_SELECTED_REGIONS;
    selectedRegions: GeoJsonObject;
    selectedBounds: LatLngBounds;
    drawBounds: boolean;
}

export function updateSelectedRegions(selectedRegions: GeoJsonObject, selectedBounds: LatLngBounds, drawBounds: boolean)
    : UpdateSelectedRegions {
    return {type: UPDATE_SELECTED_REGIONS, selectedRegions, selectedBounds, drawBounds};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_MANUAL_BBOX = 'UPDATE_MANUAL_BBOX';
export type UPDATE_MANUAL_BBOX = typeof UPDATE_MANUAL_BBOX;

export interface UpdateManualBBox {
    type: UPDATE_MANUAL_BBOX;
    selectedBBox: LatLngBounds;
}

export function updateManualBBox(selectedBBox: LatLngBounds): UpdateManualBBox {
    return {type: UPDATE_MANUAL_BBOX, selectedBBox};
}


export const UPDATE_MANUAL_BBOX_SOUTH = 'UPDATE_MANUAL_BBOX_SOUTH';
export type UPDATE_MANUAL_BBOX_SOUTH = typeof UPDATE_MANUAL_BBOX_SOUTH;

export interface UpdateManualBBoxSouth {
    type: UPDATE_MANUAL_BBOX_SOUTH;
    selectedBBoxSouth: number | string;
}

export function updateManualBBoxSouth(selectedBBoxSouth: number | string): UpdateManualBBoxSouth {
    return {type: UPDATE_MANUAL_BBOX_SOUTH, selectedBBoxSouth};
}


export const UPDATE_MANUAL_BBOX_WEST = 'UPDATE_MANUAL_BBOX_WEST';
export type UPDATE_MANUAL_BBOX_WEST = typeof UPDATE_MANUAL_BBOX_WEST;

export interface UpdateManualBBoxWest {
    type: UPDATE_MANUAL_BBOX_WEST;
    selectedBBoxWest: number | string;
}

export function updateManualBBoxWest(selectedBBoxWest: number | string): UpdateManualBBoxWest {
    return {type: UPDATE_MANUAL_BBOX_WEST, selectedBBoxWest};
}


export const UPDATE_MANUAL_BBOX_NORTH = 'UPDATE_MANUAL_BBOX_NORTH';
export type UPDATE_MANUAL_BBOX_NORTH = typeof UPDATE_MANUAL_BBOX_NORTH;

export interface UpdateManualBBoxNorth {
    type: UPDATE_MANUAL_BBOX_NORTH;
    selectedBBoxNorth: number | string;
}

export function updateManualBBoxNorth(selectedBBoxNorth: number | string): UpdateManualBBoxNorth {
    return {type: UPDATE_MANUAL_BBOX_NORTH, selectedBBoxNorth};
}


export const UPDATE_MANUAL_BBOX_EAST = 'UPDATE_MANUAL_BBOX_EAST';
export type UPDATE_MANUAL_BBOX_EAST = typeof UPDATE_MANUAL_BBOX_EAST;

export interface UpdateManualBBoxEast {
    type: UPDATE_MANUAL_BBOX_EAST;
    selectedBBoxEast: number | string;
}

export function updateManualBBoxEast(selectedBBoxEast: number | string): UpdateManualBBoxEast {
    return {type: UPDATE_MANUAL_BBOX_EAST, selectedBBoxEast};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_MANUAL_BBOX_DIALOG = 'CLOSE_MANUAL_BBOX_DIALOG';
export type CLOSE_MANUAL_BBOX_DIALOG = typeof CLOSE_MANUAL_BBOX_DIALOG;

export interface CloseManualBBoxDialog {
    type: CLOSE_MANUAL_BBOX_DIALOG;
}

export function closeManualBBoxDialog(): CloseManualBBoxDialog {
    return {type: CLOSE_MANUAL_BBOX_DIALOG};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_MANUAL_BBOX_DIALOG = 'OPEN_MANUAL_BBOX_DIALOG';
export type OPEN_MANUAL_BBOX_DIALOG = typeof OPEN_MANUAL_BBOX_DIALOG;

export interface OpenManualBBoxDialog {
    type: OPEN_MANUAL_BBOX_DIALOG;
}

export function openManualBBoxDialog(): OpenManualBBoxDialog {
    return {type: OPEN_MANUAL_BBOX_DIALOG};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLEAR_BBOX = 'CLEAR_BBOX';
export type CLEAR_BBOX = typeof CLEAR_BBOX;

export interface ClearBbox {
    type: CLEAR_BBOX;
}

export function clearBbox(): ClearBbox {
    return {type: CLEAR_BBOX};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_HELP_DIALOG = 'OPEN_HELP_DIALOG';
export type OPEN_HELP_DIALOG = typeof OPEN_HELP_DIALOG;

export interface OpenHelpDialog {
    type: OPEN_HELP_DIALOG;
}

export function openHelpDialog(): OpenHelpDialog {
    return {type: OPEN_HELP_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_HELP_DIALOG = 'CLOSE_HELP_DIALOG';
export type CLOSE_HELP_DIALOG = typeof CLOSE_HELP_DIALOG;

export interface CloseHelpDialog {
    type: CLOSE_HELP_DIALOG;
}

export function closeHelpDialog(): CloseHelpDialog {
    return {type: CLOSE_HELP_DIALOG};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type SearchMapAction = UpdateSelectedRegions | UpdateManualBBox | CloseManualBBoxDialog | OpenManualBBoxDialog
    | UpdateManualBBoxSouth
    | UpdateManualBBoxWest
    | UpdateManualBBoxNorth
    | UpdateManualBBoxEast
    | OpenHelpDialog
    | CloseHelpDialog;