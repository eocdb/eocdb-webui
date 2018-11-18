import { GeoJsonObject } from 'geojson';

export const UPDATE_SELECTED_REGIONS = 'UPDATE_SELECTED_REGIONS';
export type UPDATE_SELECTED_REGIONS = typeof UPDATE_SELECTED_REGIONS;

export interface UpdateSelectedRegions {
    type: UPDATE_SELECTED_REGIONS;
    selectedRegions: GeoJsonObject;
}

export function updateSelectedRegions(selectedRegions: GeoJsonObject): UpdateSelectedRegions {
    return {type: UPDATE_SELECTED_REGIONS, selectedRegions};
}


export type SearchMapAction = UpdateSelectedRegions;