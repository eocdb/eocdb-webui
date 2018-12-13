import * as React from 'react'
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import { FeatureGroup, Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLng, LatLngBounds } from 'leaflet';
import { GeoJsonObject } from 'geojson';

import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/dist/styles.css';

// FIXME: forman did not find any typedefs for 'react-leaflet-draw', 2018.11.xx
// import EditControl from "react-leaflet-draw";
const reactLeafletDraw = require('react-leaflet-draw');
const EditControl = reactLeafletDraw.EditControl;


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({});

interface SearchMapProps extends WithStyles<typeof styles> {
    position: LatLng;
    zoom: number;

    updateSelectedRegions: (selectedRegions: GeoJsonObject, selectedBounds?: LatLngBounds) => void;
    testMarkerCluster?: boolean;

    measurementPoints: {};
    drawMeasurementPoints?: boolean;
}

const DRAW_OPTIONS = {
    circle: true,
    rectangle: true,
    polygon: true,
    polyline: false,
    marker: false,
    circlemarker: false
};

//let MARKERS: React.ReactNode[] | null = null;

class SearchMap extends React.PureComponent<SearchMapProps> {
    private editableFeatureGroupRef: any = null;

    createMarker(lat: number, lon: number, key: number, dsId: number) {
        return <Marker key={key} position={new LatLng(lat, lon)}><Popup>DS-ID {dsId}<br/>Key {key}</Popup></Marker>;
    }

    renderMeasurementPointCluster(){
        let i = 0;
        let markers = [];
        for(let f in this.props.measurementPoints) {
            let feat_str = this.props.measurementPoints[f];
            feat_str = feat_str.replace(new RegExp("'", 'g'), '"');
            const feats = JSON.parse(feat_str)['features'];
            let last_coords = [];
            for(let feat=0; feat<feats.length; feat++) {
                const coords = feats[0]['geometry']['coordinates'];
                if(last_coords != coords) {
                    const marker = this.createMarker(coords[1], coords[0], i, i);
                    markers.push(marker);
                    i += 1;
                }
                last_coords = coords;
            }
        }
        return markers;
    }

    render() {
        const markerClusterGroup = (
            <MarkerClusterGroup
                chunkedLoading={true}
            >
                {this.renderMeasurementPointCluster()}
            </MarkerClusterGroup>
        );
        return (
            <Map center={this.props.position} zoom={this.props.zoom} maxZoom={24}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <TileLayer
                    url="https://gis.ngdc.noaa.gov/arcgis/rest/services/web_mercator/gebco_2014_contours/MapServer/tile/{z}/{y}/{x}"
                    attribution="&copy; <a href=&quot;https://www.gebco.net/data_and_products/gridded_bathymetry_data/&quot;>GEBCO</a>, <a href=&quot;https://maps.ngdc.noaa.gov/&quot;>NOAHH</a> and contributors"
                    maxZoom={9}
                />
                <TileLayer
                    url="https://a.tiles.mapbox.com/v3/mapbox.natural-earth-2/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;https://www.naturalearthdata.com/&quot;>MapBox</a>, <a href=&quot;https://www.mapbox.com/&quot;>MapBox</a> and contributors"
                    maxZoom={6}
                />

                {markerClusterGroup}

                <FeatureGroup ref={(featureGroupRef: any) => this.handleFeatureGroupReady(featureGroupRef)}>
                    <EditControl
                        position='topright'
                        draw={DRAW_OPTIONS}
                        onEdited={this.handleGeometryEdited}
                        onCreated={this.handleGeometryCreated}
                        onDeleted={this.handleGeometryDeleted}
                        onMounted={this.handleDrawControlMounted}
                        onEditStart={this.handleGeometryEditStart}
                        onEditStop={this.handleGeometryEditStop}
                        onDeleteStart={this.handleGeometryDeleteStart}
                        onDeleteStop={this.handleGeometryDeleteStop}
                    />
                </FeatureGroup>
            </Map>
        );
    }

    private handleFeatureGroupReady = (featureGroupRef: any) => {
        // // populate the leaflet FeatureGroup with the geoJson layers
        // let leafletGeoJSON = new GeoJSON(getGeoJson());
        // let leafletFeatureGroup = featureGroupRef.leafletElement;
        // leafletGeoJSON.eachLayer((layer: Layer) => {
        //     leafletFeatureGroup.addLayer(layer);
        // });

        // store the ref for future access to content
        this.editableFeatureGroupRef = featureGroupRef;
    };

    private updateSelectedRegions = (e: any) => {
        // this.editableFeatureGroupRef contains the edited geometry, which can be manipulated through the leaflet API
        const featureGroupRef = this.editableFeatureGroupRef;
        if (featureGroupRef && this.props.updateSelectedRegions) {
            const selectedRegion = featureGroupRef.leafletElement.toGeoJSON();
            const layer = e.layer;
            if (layer) {
                this.props.updateSelectedRegions(selectedRegion, layer.getBounds());
            } else {
                this.props.updateSelectedRegions(selectedRegion);
            }
        }
    };

    private handleGeometryEdited = (e: any) => {
        this.updateSelectedRegions(e);
    };

    private handleGeometryCreated = (e: any) => {
        this.updateSelectedRegions(e);
    };

    private handleGeometryDeleted = (e: any) => {
        /*
        let numDeleted = 0;
        e.layers.eachLayer((layer: Layer) => {
            numDeleted += 1;
        });
        console.log(`handleGeometryDeleted: removed ${numDeleted} layers`, e);
        */
        this.updateSelectedRegions(e);
    };

    // noinspection JSUnusedLocalSymbols
    private handleDrawControlMounted = (drawControl: any) => {
        // console.log('handleDrawControlMounted', drawControl);
    };

    // noinspection JSUnusedLocalSymbols
    private handleGeometryEditStart = (e: any) => {
        // console.log('handleGeometryEditStart', e);
    };

    // noinspection JSUnusedLocalSymbols
    private handleGeometryEditStop = (e: any) => {
        // console.log('handleGeometryEditStop', e);
    };

    // noinspection JSUnusedLocalSymbols
    private handleGeometryDeleteStart = (e: any) => {
        // console.log('handleGeometryDeleteStart', e);
    };

    // noinspection JSUnusedLocalSymbols
    private handleGeometryDeleteStop = (e: any) => {
        // console.log('handleGeometryDeleteStop', e);
    };

}

export default withStyles(styles)(SearchMap);


