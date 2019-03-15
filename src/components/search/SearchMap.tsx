import * as React from 'react'
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import { FeatureGroup, Map, Marker, Popup, Rectangle, TileLayer } from 'react-leaflet'
import { geoJSON, Icon, LatLng, LatLngBounds } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/dist/styles.css';
import { DatasetRef, QueryResult } from "../../model";

import markerInv from './marker_inv.png';
import marker from './marker.png';
import { BBoxValue } from "./BBoxInput";

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

    foundDatasets: QueryResult;
    drawMeasurementPoints?: boolean;

    updateSelectedDatasets: (selectedDatasets: string[], selectedBounds?: LatLngBounds) => void;
    selectedDatasets: string[];

    selectedBounds?: LatLngBounds;

    selectedRectangleFromAdvancedDialog?: BBoxValue;
}

const DRAW_OPTIONS = {
    circle: true,
    rectangle: true,
    polygon: true,
    polyline: false,
    marker: false,
    circlemarker: false
};

//const average = (arr: number[]) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

//let MARKERS: React.ReactNode[] | null = null;

class SearchMap extends React.PureComponent<SearchMapProps> {
    private editableFeatureGroupRef: any = null;

    createMarker(lat: number, lon: number, key: string, dsId: string) {
        if (this.props.selectedDatasets.indexOf(dsId) >= 0) {
            const icon = new Icon({iconUrl: markerInv});
            return <Marker onclick={() => this.handleMarkerClick(dsId)} key={key}
                           icon={icon}
                           position={new LatLng(lat, lon)}><Popup>Path: {key}</Popup></Marker>;
        } else {
            const icon = new Icon({iconUrl: marker});
            return <Marker onclick={() => this.handleMarkerClick(dsId)} key={key}
                           icon={icon}
                           position={new LatLng(lat, lon)}><Popup>Path: {key}</Popup></Marker>;
        }
    }

    handleMarkerClick(id: string) {
        const selected = this.props.selectedDatasets;
        let newSelected = [];

        let found = false;
        for (let s of selected) {
            if (s !== id) {
                newSelected.push(s);
            } else {
                found = true;
            }
        }

        if (!found) {
            newSelected.push(id);
        }

        this.props.updateSelectedDatasets(newSelected, undefined);
    }

    getDatasetRef = (id: string): DatasetRef | undefined => {
        return this.props.foundDatasets.datasets.find((dr: DatasetRef) => {
            return dr.id === id;
        });
    };

    renderMeasurementPointCluster() {
        let markers = [];

        for (let f in this.props.foundDatasets.locations) {
            let feat_str = this.props.foundDatasets.locations[f];

            const dr = this.getDatasetRef(f);

            feat_str = feat_str.replace(new RegExp("'", 'g'), '"');
            const feats = JSON.parse(feat_str)['features'];
            let last_coords = [];
            for (let feat = 0; feat < feats.length; feat++) {
                const coords = feats[0]['geometry']['coordinates'];
                if (last_coords != coords) {
                    const marker = this.createMarker(coords[1], coords[0], dr ? dr.path : 'unknown', f);
                    markers.push(marker);
                }
                last_coords = coords;
            }
        }
        return markers;
    }

    getBoundsFromDatasets = (): LatLngBounds | undefined => {
        let bounds;
        if (this.props.foundDatasets.datasets.length > 0) {
            bounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));

            for (let feat in this.props.foundDatasets.locations) {
                let feat_str = this.props.foundDatasets.locations[feat];
                feat_str = feat_str.replace(new RegExp("'", 'g'), '"');

                bounds.extend(geoJSON(JSON.parse(feat_str)).getBounds());
            }
        }

        return bounds;
    };

    getAdvancedBounds = () => {
        const bbox = this.props.selectedRectangleFromAdvancedDialog;

        console.log(bbox);
        return bbox ? new LatLngBounds(
            new LatLng(+bbox[0], +bbox[1]),
            new LatLng(+bbox[2], +bbox[3]),
            ) :
            undefined;
    };

    render() {
        const bounds = this.getBoundsFromDatasets();

        const advancedRegion = this.getAdvancedBounds();

        const markerClusterGroup = (
            <MarkerClusterGroup
                chunkedLoading={true}
            >
                {this.renderMeasurementPointCluster()}
            </MarkerClusterGroup>
        );
        return (
            <Map zIndex={1} bounds={bounds} center={this.props.position} zoom={this.props.zoom} maxZoom={24}>
                <TileLayer
                    zIndex={1}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <TileLayer
                    zIndex={1}
                    url="https://gis.ngdc.noaa.gov/arcgis/rest/services/web_mercator/gebco_2014_contours/MapServer/tile/{z}/{y}/{x}"
                    attribution="&copy; <a href=&quot;https://www.gebco.net/data_and_products/gridded_bathymetry_data/&quot;>GEBCO</a>, <a href=&quot;https://maps.ngdc.noaa.gov/&quot;>NOAHH</a> and contributors"
                    maxZoom={9}
                />
                <TileLayer
                    zIndex={1}
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
                    {
                        advancedRegion ?
                            <Rectangle bounds={advancedRegion}/>
                            : ''
                    }
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
            console.log(selectedRegion);
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


