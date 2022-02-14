import * as React from 'react'
import { LatLng, LatLngBounds } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { QueryResult } from "../../model";

import { BBoxValue } from "./BBoxInput";


// FIXME: forman did not find any typedefs for 'react-leaflet-draw', 2018.11.xx
// import EditControl from "react-leaflet-draw";


interface SearchMapProps {
    position: LatLng;
    zoom: number;

    updateSelectedRegions: (selectedRegions: GeoJsonObject, selectedBounds?: LatLngBounds, drawBounds?: boolean) => void;
    testMarkerCluster?: boolean;

    foundDatasets: QueryResult;
    drawMeasurementPoints?: boolean;

    updateSelectedDatasets: (selectedDatasets: string[], selectedBounds?: LatLngBounds) => void;
    selectedDatasets: string[];

    selectedBounds?: LatLngBounds;
    mapBounds?: LatLngBounds;
    drawBounds?: boolean;

    selectedManualBBox?: LatLngBounds;
    updateManualBBox: (selectedBBox: LatLngBounds) => void;
    openManualBBoxDialog: () => void;
    closeManualBBoxDialog: () => void;
    manualBBoxInputOpen: boolean;

    updateManualBBoxSouth: (south: number | string) => void;
    selectedBBoxSouth: number | string;

    updateManualBBoxWest: (west: number | string) => void;
    selectedBBoxWest: number | string;

    updateManualBBoxNorth: (north: number | string) => void;
    selectedBBoxNorth: number | string;

    updateManualBBoxEast: (east: number | string) => void;
    selectedBBoxEast: number | string;

    selectedRectangleFromAdvancedDialog?: BBoxValue;
}



//const average = (arr: number[]) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

//let MARKERS: React.ReactNode[] | null = null;

class SearchMap extends React.PureComponent<SearchMapProps> {

    constructor(props: SearchMapProps) {
        super(props);
    }



    render() {
        return (
            <div style={{zIndex: 1}}>
            </div>
        );
    }


}

export default SearchMap;


