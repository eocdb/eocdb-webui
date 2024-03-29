import * as React from 'react'
import { FeatureGroup, MapContainer, Marker, Pane, Popup, Rectangle, TileLayer } from 'react-leaflet'
import L, { geoJSON, Icon, LatLng, LatLngBounds} from 'leaflet';
import { GeoJsonObject } from 'geojson';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { DatasetRef, QueryResult } from "../../model";

import markerInv from './marker_inv.png';
import marker from './marker.png';
import './markercluster.css'
import BBoxInputDialog, { BBoxValue } from "./BBoxInputDialog";
import { Button, Tooltip } from "@mui/material";
import { EditControl } from "react-leaflet-draw";
import InputIcon from '@mui/icons-material/Input';
import ReactiveRectangle from "./ReactiveRectangle";

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
                    sx={{ backgroundColor: 'white' }}
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
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }


    createMarker(lat: number, lon: number, key: string, dsId: string) {
        const icon = new Icon({iconUrl: marker, iconSize: [25, 41], iconAnchor: [13, 39]});
        if (this.props.selectedDatasets.indexOf(dsId) >= 0) {
            icon.options.iconUrl = markerInv;
        }
        return <Marker
            eventHandlers={{ click: () => { this.handleMarkerClick(dsId) } }}
            key={key}
            icon={icon}
            position={new LatLng(lat, lon)}><Popup>Path: {key}</Popup></Marker>;
    }

    handleMarkerClick(datasetId: string) {
        const selected = this.props.selectedDatasets;
        let newSelected = [];

        let found = false;
        for (let s of selected) {
            if (s !== datasetId) {
                newSelected.push(s);
            } else {
                found = true;
            }
        }

        if (!found) {
            newSelected.push(datasetId);
        }

        this.props.updateSelectedDatasets(newSelected, undefined);
    }
   

    getDatasetRef = (id: string): DatasetRef | undefined => {
        return this.props.foundDatasets.datasets.find((dr: DatasetRef) => {
            return dr.id === id;
        });
    };

    renderMeasurementPointAndRectangles() {
        let markers = [];
        let rectList = [];

        for (let datasetId in this.props.foundDatasets.locations) {
            let feat_str = this.props.foundDatasets.locations[datasetId];

            const dr = this.getDatasetRef(datasetId);

            feat_str = feat_str.replace(new RegExp("'", 'g'), '"');
            const feats = JSON.parse(feat_str)['features'];
            const coords = []

            for (let feat = 0; feat < feats.length; feat++) {
                const point = feats[feat]['geometry']['coordinates'];
                coords.push({lon: point[0], lat: point[1]});
            }

            let calculated = this.calculateLatLonMinMaxAndCentroid(coords);

            const maxLat = calculated.maxLatitude;
            const minLat = calculated.minLatitude;
            const maxLon = calculated.maxLongitude;
            const minLon = calculated.minLongitude;

            const rectangleCanBeCreated = minLon !== maxLon && minLat !== maxLat;

            if (rectangleCanBeCreated) {
                const rect = {
                    maxLat: maxLat, minLat: minLat,
                    maxLon: maxLon, minLon: minLon,
                    key: dr ? dr.path : 'unknown', datasetId,
                    searchMap: this
                };
                const width = maxLon - minLon;
                const height = maxLat - minLat;
                rect['area'] = width * height;
                rectList.push(rect);
            } else {
                const marker = this.createMarker(
                    calculated.center.lat, calculated.center.lon,
                    dr ? dr.id : 'unknown', datasetId);
                markers.push(marker);
            }
        }
        rectList.sort((a, b) => {
            return b.area - a.area;
        });
        return {markers, rectList};
    }

    calculateLatLonMinMaxAndCentroid(points: any) {
        let minLongitude = Infinity;
        let maxLongitude = -Infinity;
        let minLatitude = Infinity;
        let maxLatitude = -Infinity;
        let center = {lon: 0, lat: 0};

        points.forEach((point) => {
            minLongitude = Math.min(minLongitude, point.lon);
            maxLongitude = Math.max(maxLongitude, point.lon);
            minLatitude = Math.min(minLatitude, point.lat);
            maxLatitude = Math.max(maxLatitude, point.lat);
            center.lon += point.lon;
            center.lat += point.lat;
        });
        center.lon = center.lon / points.length;
        center.lat = center.lat / points.length;

        return {
            minLongitude,
            maxLongitude,
            minLatitude,
            maxLatitude,
            center
        };
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
        if (!this.props.selectedBounds) {
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

        this.props.updateSelectedRegions({ type: 'Polygon' }, selectedBBox, true);
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

    createClusterCustomIcon = (cluster) => {
        return L.divIcon({
            html: `<span>${cluster.getChildCount()}</span>`,
            className: 'marker-cluster-custom',
            iconSize: L.point(40, 40, true),
        });
    };

    render() {
        // console.log('searchMap:', this.props.selectedDatasets)
        const bounds = this.getBoundsFromDatasets();
        const retVal = this.renderMeasurementPointAndRectangles();

        let markerClusterGroup: JSX.Element;
        if (retVal.markers.length > 0) {
            markerClusterGroup = (
                <MarkerClusterGroup
                    key={'mcg_' + retVal.markers[0].key}
                    // chunkedLoading={true}
                    iconCreateFunction={this.createClusterCustomIcon}
                >
                    {retVal.markers}
                </MarkerClusterGroup>
            );
        }

        return (
            <MapContainer bounds={bounds} center={this.props.position}
                zoom={this.props.zoom} maxZoom={24} className="markercluster-map">
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
                    {this.props.selectedBounds && this.props.drawBounds ? <Rectangle bounds={this.props.selectedBounds} /> : ""}
                </FeatureGroup>
                {retVal.rectList.map((rect, i) => (
                    <Pane key={rect.key} name={'rect_' + i}>
                        <ReactiveRectangle maxLatitude={rect.maxLat} minLatitude={rect.minLat}
                                           maxLongitude={rect.maxLon} minLongitude={rect.minLon}
                                           datasetId={rect.datasetId} selectedDatasets={this.props.selectedDatasets}
                                           onClick={this.handleMarkerClick}/>
                    </Pane>
                ))}
                {retVal.markers.length > 0 ? markerClusterGroup : ''}
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


