import { BBoxValue } from "../components/search/BBoxInputDialog";
import { SliderRange } from "../types/advancedSearchDialog";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_BBOX = 'UPDATE_BBOX';
export type UPDATE_BBOX = typeof UPDATE_BBOX;

export interface UpdateBBox {
    type: UPDATE_BBOX;
    selectedBBox: BBoxValue;
}

export function updateBBox(selectedBBox: BBoxValue): UpdateBBox {
    return {type: UPDATE_BBOX, selectedBBox};
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
    waterDepth: SliderRange;
}

export function updateWaterDepth(waterDepth: SliderRange): UpdateWaterDepth {
    return {type: UPDATE_WATERDEPTH , waterDepth};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS ';
export type UPDATE_PRODUCTS  = typeof UPDATE_PRODUCTS ;

export interface UpdateProducts {
    type: UPDATE_PRODUCTS ;
    selectedProducts: string[];
}

export function updateProducts(selectedProducts: string[]): UpdateProducts {
    return {type: UPDATE_PRODUCTS , selectedProducts};
}


export type AdvancedSearchAction = UpdateBBox
    | UpdateWavelength
    | UpdateWaterDepth
    | UpdateOptShallow
    | UpdateProducts;
