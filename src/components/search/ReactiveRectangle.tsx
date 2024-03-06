import { LatLngBoundsExpression } from "leaflet";
import { Rectangle } from "react-leaflet";
import * as React from "react";

interface ReactiveRectangleProps {
    minLongitude: number
    maxLongitude: number
    minLatitude: number
    maxLatitude: number
    selectedDatasets: string[]
    datasetId: string
    onClick: (datasetId:string) => void
}

export default function ReactiveRectangle({
                                              maxLatitude, minLatitude, maxLongitude, minLongitude,
                                              selectedDatasets, datasetId, onClick
                                          }: ReactiveRectangleProps) {

    const handleClick = () => {
        onClick(datasetId);
    };

    const bounds: LatLngBoundsExpression = [
        [minLatitude, minLongitude],
        [maxLatitude, maxLongitude]
    ];

    const color = selectedDatasets.indexOf(datasetId) >= 0 ? 'red' : 'blue';
    // console.log('ReactiveRectangle', datasetId, color, selectedDatasets)
    return <Rectangle
        key={datasetId + color}
        bounds={bounds}
        color={color}
        eventHandlers={{
            click: handleClick
        }}
    />;
}

