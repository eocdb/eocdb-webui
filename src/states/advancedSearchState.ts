import { LatLng, LatLngBounds } from "leaflet";
import { WavelengthsMode } from "../api/findDatasets";

export interface AdvancedSearchState {
    selectedBounds: LatLngBounds;
    selectedWavelength: WavelengthsMode;
    waterDepthMin: number;
    waterDepthMax: number;
    selectedOptShallow: string;
}

export const SELECTED_BOUNDS_DEFAULT = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));

export function newAdvancedSearchState(): AdvancedSearchState  {
    return {
        selectedBounds: SELECTED_BOUNDS_DEFAULT,
        selectedWavelength: 'all',
        waterDepthMin: 0,
        waterDepthMax: 1000,
        selectedOptShallow: '',
    };
}
