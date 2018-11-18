import * as React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import { LatLng } from 'leaflet';


interface SearchMapProps {
    position: LatLng;
    zoom: number;
}


class SearchMap extends React.PureComponent<SearchMapProps> {

    render() {
        return (
            <Map center={this.props.position} zoom={this.props.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={this.props.position}>
                    <Popup>A pretty CSS3 popup.<br/>Easily customizable.</Popup>
                </Marker>
            </Map>
        );
    }
}

export default SearchMap;
