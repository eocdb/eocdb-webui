import { LatLng } from 'leaflet';

export interface SearchMapState {
    position: LatLng;
    zoom: number;
}

const EUMETSAT_LAT_LNG = new LatLng(49.858996564, 8.622830842 );

export function newSearchMapState() {
    return {
        position: EUMETSAT_LAT_LNG,
        zoom: 4,
    }
}