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

export function updateSelectedRegions(selectedRegions: GeoJsonObject, selectedBounds: LatLngBounds, drawBounds: boolean): UpdateSelectedRegions {
    return {type: UPDATE_SELECTED_REGIONS, selectedRegions, selectedBounds, drawBounds};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SELECTED_REGION_FROM_ADVANCED = 'UPDATE_SELECTED_REGION_FROM_ADVANCED';
export type UPDATE_SELECTED_REGION_FROM_ADVANCED = typeof UPDATE_SELECTED_REGION_FROM_ADVANCED;

export interface UpdateSelectedRegionFromAdvanced {
    type: UPDATE_SELECTED_REGION_FROM_ADVANCED;
    selectedRegion: LatLngBounds;
}

export function updateSelectedRegionFromAdvanced(selectedRegion: LatLngBounds): UpdateSelectedRegionFromAdvanced {
    return {type: UPDATE_SELECTED_REGION_FROM_ADVANCED, selectedRegion};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type SearchMapAction = UpdateSelectedRegions | UpdateSelectedRegionFromAdvanced;