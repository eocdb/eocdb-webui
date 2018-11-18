import * as React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import { BoundingBox } from "../types";
import { LatLng } from "leaflet";


interface RegionSelectState {
    bbox: BoundingBox;
    position: LatLng;
}


interface RegionSelectProps {

}

class RegionSelect extends React.PureComponent<RegionSelectProps, RegionSelectState> {
    constructor(props: RegionSelectProps) {
        super(props);

        this.state = {
            bbox: [0, 0, 0, 0],
            position: new LatLng(51.505, -0.09),
        }
    }


    render() {
        return (
            <div id={'map-container'}>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"/>

                <Map center={this.state.position} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={this.state.position}>
                        <Popup>A pretty CSS3 popup.<br/>Easily customizable.</Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}

export default RegionSelect;