import { GeoJsonObject } from 'geojson';
import { LatLng, LatLngBounds } from 'leaflet';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SELECTED_REGIONS = 'UPDATE_SELECTED_REGIONS';
export type UPDATE_SELECTED_REGIONS = typeof UPDATE_SELECTED_REGIONS;

export interface UpdateSelectedRegions {
    type: UPDATE_SELECTED_REGIONS;
    selectedRegions: GeoJsonObject;
    selectedBounds: LatLngBounds;
}

export function updateSelectedRegions(selectedRegions: GeoJsonObject, selectedBounds: LatLngBounds): UpdateSelectedRegions {
    return {type: UPDATE_SELECTED_REGIONS, selectedRegions, selectedBounds};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_POSITION = 'UPDATE_POSITION';
export type UPDATE_POSITION = typeof UPDATE_POSITION;

export interface UpdatePosition {
    type: UPDATE_POSITION;
    position: LatLng;
}

export function updatePosition(position: LatLng): UpdatePosition {
    return {type: UPDATE_POSITION, position};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type SearchMapAction = UpdateSelectedRegions | UpdatePosition;