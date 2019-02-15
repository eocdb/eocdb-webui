import { LatLngBounds } from "leaflet";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_BBOX = 'UPDATE_BBOX';
export type UPDATE_BBOX = typeof UPDATE_BBOX;

export interface UpdateBBox {
    type: UPDATE_BBOX;
    selectedBounds: LatLngBounds;
}

export function updateBBox(selectedBounds: LatLngBounds): UpdateBBox {
    return {type: UPDATE_BBOX, selectedBounds};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_WAVELENGTH = 'UPDATE_WAVELENGTH ';
export type UPDATE_WAVELENGTH  = typeof UPDATE_WAVELENGTH ;

export interface UpdateWavelength {
    type: UPDATE_WAVELENGTH ;
    selectedWavelength: string;
}

export function updateWavelength(selectedWavelength: string): UpdateWavelength {
    return {type: UPDATE_WAVELENGTH , selectedWavelength};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_OPTSHALLOW = 'UPDATE_OPTSHALLOW ';
export type UPDATE_OPTSHALLOW  = typeof UPDATE_OPTSHALLOW ;

export interface UpdateOptShallow {
    type: UPDATE_OPTSHALLOW ;
    selectedOptShallow: string;
}

export function updateOptShallow(selectedOptShallow: string): UpdateOptShallow {
    return {type: UPDATE_OPTSHALLOW , selectedOptShallow};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_WATERDEPTH = 'UPDATE_WATERDEPTH ';
export type UPDATE_WATERDEPTH  = typeof UPDATE_WATERDEPTH ;

export interface UpdateWaterDepth {
    type: UPDATE_WATERDEPTH ;
    waterDepth: number[];
}

export function updateWaterDepth(waterDepth: number[]): UpdateWaterDepth {
    return {type: UPDATE_WATERDEPTH , waterDepth};
} 


export type AdvancedSearchAction = UpdateBBox | UpdateWavelength | UpdateWaterDepth | UpdateOptShallow;