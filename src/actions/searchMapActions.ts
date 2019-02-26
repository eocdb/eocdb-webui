import { GeoJsonObject } from 'geojson';
import { LatLngBounds } from 'leaflet';

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

export type SearchMapAction = UpdateSelectedRegions;