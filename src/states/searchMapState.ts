import { LatLng, LatLngBounds } from 'leaflet';
import { GeoJsonObject } from 'geojson';

export interface SearchMapState {
    position: LatLng;
    zoom: number;
    selectedRegions?: GeoJsonObject;
    selectedBounds?: LatLngBounds;
    drawBounds?: boolean;
    selectedManualBounds?: LatLngBounds;
    manualBBoxInputOpen: boolean;
    selectedBBoxSouth: number|string;
    selectedBBoxWest: number|string;
    selectedBBoxNorth: number|string;
    selectedBBoxEast: number|string;
    clearLayers: boolean;
}

const EUMETSAT_LAT_LNG = new LatLng(49.858996564, 8.622830842);

export function newSearchMapState() {
    return {
        position: EUMETSAT_LAT_LNG,
        zoom: 4,
        drawBounds: false,
        manualBBoxInputOpen: false,
        selectedBBoxSouth: '',
        selectedBBoxWest: '',
        selectedBBoxNorth: '',
        selectedBBoxEast: '',
        clearLayers: false,
    }
}
