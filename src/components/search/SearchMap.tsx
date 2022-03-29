import * as React from 'react'
import { FeatureGroup, MapContainer, Marker, Popup, Rectangle, TileLayer } from 'react-leaflet'
import { geoJSON, Icon, LatLng, LatLngBounds } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { DatasetRef, QueryResult } from "../../model";

import markerInv from './marker_inv.png';
import marker from './marker.png';
import { BBoxValue } from "./BBoxInputDialog";
import BBoxInputDialog from "./BBoxInputDialog";
import { Button, Tooltip } from "@mui/material";
import { EditControl } from "react-leaflet-draw";
import InputIcon from '@mui/icons-material/Input';


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


const DRAW_OPTIONS = {
    circle: false,
    rectangle: true,
    polygon: false,
    polyline: false,
    marker: false,
    circlemarker: false
};

interface MapBBoxComponentProps {
    position: string;
    handleManualBBoxInputOpen: () => void;
}

const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

function MapBBoxComponent(props: MapBBoxComponentProps) {
    const positionClass =
        (props.position && POSITION_CLASSES[props.position]) || POSITION_CLASSES.topright

    return (
        <div className={positionClass}>
            <Tooltip title="Enter BBox manually">
                <Button
                    className={"leaflet-control leaflet-bar"}
                    onClick={props.handleManualBBoxInputOpen}
                    sx={{backgroundColor: 'white'}}
                >
                    <InputIcon />
                </Button>
            </Tooltip>
        </div>
    );
}


class SearchMap extends React.PureComponent<SearchMapProps> {
    private editableFeatureGroupRef: any = null;
    private layers: any = [];

    constructor(props: SearchMapProps) {
        super(props);
    }


    createMarker(lat: number, lon: number, key: string, dsId: string) {
        if (this.props.selectedDatasets.indexOf(dsId) >= 0) {
            const icon = new Icon({iconUrl: markerInv, iconSize: [25, 41], iconAnchor: [13, 39]});
            return <Marker eventHandlers={{click: () => {this.handleMarkerClick(dsId)}}} key={key}
                           icon={icon}
                           position={new LatLng(lat, lon)}><Popup>Path: {key}</Popup></Marker>;
        } else {
            const icon = new Icon({iconUrl: marker, iconSize: [25, 41], iconAnchor: [13, 39]});
            return <Marker eventHandlers={{click: () => {this.handleMarkerClick(dsId)}}} key={key}
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

    componentDidUpdate(prevProps: Readonly<SearchMapProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(!this.props.selectedBounds){
            this.handleClearLayers();
        }
    }

    handleClearLayers = () => {
        for (let i in this.layers) {
            this.editableFeatureGroupRef.leafletElement.removeLayer(this.layers[i]);
        }
    };

    handleBBoxSave = (selectedBBox: LatLngBounds) => {
        this.handleClearLayers();

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
            <MapContainer bounds={bounds} center={this.props.position}
                 zoom={this.props.zoom} maxZoom={24}>
                <BBoxInputDialog
                    open={this.props.manualBBoxInputOpen}
                    onClose={this.props.closeManualBBoxDialog}
                    onBBoxSave={this.handleBBoxSave}

                    south={this.props.selectedBBoxSouth}
                    onSouthChange={this.props.updateManualBBoxSouth}

                    west={this.props.selectedBBoxWest}
                    onWestChange={this.props.updateManualBBoxWest}

                    north={this.props.selectedBBoxNorth}
                    onNorthChange={this.props.updateManualBBoxNorth}

                    east={this.props.selectedBBoxEast}
                    onEastChange={this.props.updateManualBBoxEast}
                />
                <MapBBoxComponent
                    position="topright"
                    handleManualBBoxInputOpen={this.handleManualBBoxInputOpen}
                />

                <TileLayer
                    url="https://api.mapbox.com/styles/v1/dzelge/cku402gu215vz17nxgd3zakof/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHplbGdlIiwiYSI6ImNqb2lkbnhncjA4M3IzcW9qc3plMHh1cnEifQ.HnxI3KKlVliIX_J-YQvhTw"
                    attribution="&copy; <a href=&quot;https://www.mapbox.com/about/maps/&quot;>Mapbox</a> © <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> <strong><a href=&quot;https://www.mapbox.com/map-feedback/&quot; target=&quot;_blank&quot;>Improve this map</a></strong>"
                />

                {markerClusterGroup}
                {this.props.selectedBounds && this.props.drawBounds ?
                    <FeatureGroup ref={(featureGroupRef: any) => this.handleFeatureGroupReady(featureGroupRef)}>
                        <EditControl
                            position='bottomright'
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
                        <Rectangle bounds={this.props.selectedBounds}/>
                    </FeatureGroup>
                    : <FeatureGroup ref={(featureGroupRef: any) => this.handleFeatureGroupReady(featureGroupRef)}>
                        <EditControl
                            position='bottomright'
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
                }
            </MapContainer>
        );
    }

    private handleFeatureGroupReady = (featureGroupRef: any) => {
        // store the ref for future access to content
        this.editableFeatureGroupRef = featureGroupRef;
    };

    private updateSelectedRegions = (e: any) => {
        // this.editableFeatureGroupRef contains the edited geometry, which can be manipulated through the leaflet API
        const layer = e.layer;
        const selectedRegion = layer.toGeoJSON();
        const bounds = layer.getBounds();
        this.props.updateSelectedRegions(selectedRegion, bounds, this.props.drawBounds);
    };

    // noinspection JSUnusedLocalSymbols
    private deleteSelectedRegions = (e: any) => {
        this.props.updateSelectedRegions(null, null, this.props.drawBounds);
    };

    private handleGeometryEdited = (e: any) => {
        this.updateSelectedRegions(e);
    };

    private handleGeometryCreated = (e: any) => {
        this.updateSelectedRegions(e);
    };

    private handleGeometryDeleted = (e: any) => {
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

export default SearchMap;


