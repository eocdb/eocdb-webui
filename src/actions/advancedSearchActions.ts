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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_WATERDEPTH = 'UPDATE_WATERDEPTH ';
export type UPDATE_WATERDEPTH  = typeof UPDATE_WATERDEPTH ;

export interface UpdateWaterDepth {
    type: UPDATE_WATERDEPTH ;
    waterDepthMin: number;
    waterDepthMax: number;
}

export function updateWaterDepth(waterDepthMin: number, waterDepthMax: number): UpdateWaterDepth {
    return {type: UPDATE_WATERDEPTH , waterDepthMin, waterDepthMax};
}


export type AdvancedSearchAction = BboxChange | UpdateSelectedWavelength | UpdateWaterDepth;