import * as React from 'react'
import { Button, Theme, WithStyles } from '@material-ui/core';
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
import { createRef } from "react";
import BBoxInput from "./BBoxInputDialog";


// FIXME: forman did not find any typedefs for 'react-leaflet-draw', 2018.11.xx
// import EditControl from "react-leaflet-draw";
const reactLeafletDraw = require('react-leaflet-draw');
const EditControl = reactLeafletDraw.EditControl;


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({});

interface SearchMapProps extends WithStyles<typeof styles> {
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
    drawBounds: boolean;

    selectedManualBBox: LatLngBounds;
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
    //private myEditControl: any = null;
    private mapRef = createRef<Map>();

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

    handleClearLayers = () => {
        const map = this.mapRef.current;
        if (map) {
            map.leafletElement.removeLayer(this.editableFeatureGroupRef.leafletElement);
        }
    };

    handleBBoxSave = (selectedBBox: LatLngBounds) => {
        //this.handleClearLayers();

        this.props.updateSelectedRegions({type: 'Polygon'}, selectedBBox, true);
        this.props.closeManualBBoxDialog();
    };

    handleManualBBoxInputOpen = () => {
        if (this.props.selectedBounds) {
            this.props.updateManualBBoxSouth(this.props.selectedBounds.getSouth());
            this.props.updateManualBBoxWest(this.props.selectedBounds.getWest());
            this.props.updateManualBBoxNorth(this.props.selectedBounds.getNorth());
            this.props.updateManualBBoxEast(this.props.selectedBounds.getEast());
        }
        this.props.openManualBBoxDialog();
    };

    handleManualBBoxInputSouthChange = (south: number | string) => {
        this.props.updateManualBBoxSouth(south);
    };

    render() {
        const bounds = this.getBoundsFromDatasets();

        const markerClusterGroup = (
            <MarkerClusterGroup
                chunkedLoading={true}
            >
                {this.renderMeasurementPointCluster()}
            </MarkerClusterGroup>
        );
        return (
            <div style={{zIndex: 1}}>
                <BBoxInput
                    open={this.props.manualBBoxInputOpen}
                    onClose={this.props.closeManualBBoxDialog}
                    onBBoxSave={this.handleBBoxSave}

                    south={this.props.selectedBBoxSouth}
                    onSouthChange={this.handleManualBBoxInputSouthChange}

                    west={this.props.selectedBBoxWest}
                    onWestChange={this.props.updateManualBBoxWest}

                    north={this.props.selectedBBoxNorth}
                    onNorthChange={this.props.updateManualBBoxNorth}

                    east={this.props.selectedBBoxEast}
                    onEastChange={this.props.updateManualBBoxEast}
                />
                <Button onClick={this.handleManualBBoxInputOpen}>
                    test
                </Button>
                <Map ref={this.mapRef} bounds={bounds} center={this.props.position} zoom={this.props.zoom} maxZoom={24}>
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

                        {this.props.selectedBounds && this.props.drawBounds ?
                            <Rectangle bounds={this.props.selectedBounds}/> :
                            ''
                        }
                    </FeatureGroup>
                </Map>
            </div>
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

            const bounds = featureGroupRef.leafletElement.getBounds();

            this.props.updateSelectedRegions(selectedRegion, bounds);
        }
    };

    private deleteSelectedRegions = (e: any) => {
        // this.editableFeatureGroupRef contains the edited geometry, which can be manipulated through the leaflet API
        const featureGroupRef = this.editableFeatureGroupRef;
        if (featureGroupRef && this.props.updateSelectedRegions) {
            const selectedRegion = featureGroupRef.leafletElement.toGeoJSON();

            this.props.updateSelectedRegions(selectedRegion);
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
        this.props.updateManualBBoxSouth('');
        this.props.updateManualBBoxWest('');
        this.props.updateManualBBoxNorth('');
        this.props.updateManualBBoxEast('');

        this.deleteSelectedRegions(e);
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
        this.deleteSelectedRegions(e);

        this.props.updateManualBBoxSouth('');
        this.props.updateManualBBoxWest('');
        this.props.updateManualBBoxNorth('');
        this.props.updateManualBBoxEast('');
    };

}

export default withStyles(styles)(SearchMap);


