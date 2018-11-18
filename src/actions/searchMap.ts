import { GeoJsonObject } from 'geojson';

export const UPDATE_GEOMETRY = 'UPDATE_GEOMETRY';
export type UPDATE_GEOMETRY = typeof UPDATE_GEOMETRY;

export interface UpdateGeometry {
    type: UPDATE_GEOMETRY;
    object: GeoJsonObject;
}

export function updateGeometry(object: GeoJsonObject): UpdateGeometry {
    return {type: UPDATE_GEOMETRY, object};
}