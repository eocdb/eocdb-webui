import { LatLngBounds } from "leaflet";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const BBOX_CHANGE = 'BBOX_CHANGE';
export type BBOX_CHANGE = typeof BBOX_CHANGE;

export interface BboxChange {
    type: BBOX_CHANGE;
    selectedBounds: LatLngBounds;
}

export function bboxChange(selectedBounds: LatLngBounds): BboxChange {
    return {type: BBOX_CHANGE, selectedBounds};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SELECTED_WAVELENGTH = 'UPDATE_SELECTED_WAVELENGTH ';
export type UPDATE_SELECTED_WAVELENGTH  = typeof UPDATE_SELECTED_WAVELENGTH ;

export interface UpdateSelectedWavelength {
    type: UPDATE_SELECTED_WAVELENGTH ;
    selectedWavelength: string;
}

export function updateSelectedWavelength(selectedWavelength: string): UpdateSelectedWavelength {
    return {type: UPDATE_SELECTED_WAVELENGTH , selectedWavelength};
}


export type AdvancedSearchAction = BboxChange | UpdateSelectedWavelength;