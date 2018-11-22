import * as React from 'react'
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import { FeatureGroup, Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLng, LatLngBounds } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import 'react-leaflet-markercluster/dist/styles.css';
import MarkerClusterGroup from "react-leaflet-markercluster";

const draw = require('react-leaflet-draw');
const EditControl = draw.EditControl;


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({});

interface SearchMapProps extends WithStyles<typeof styles> {
    position: LatLng;
    zoom: number;
    updateSelectedRegions: (selectedRegions: GeoJsonObject, selectedBounds?: LatLngBounds) => void;
}

const DRAW_OPTIONS = {
    circle: true,
    rectangle: true,
    polygon: true,
    polyline: false,
    marker: false,
    circlemarker: false
};

const MARKERS = createRandomMarkers(10, 500);

class SearchMap extends React.PureComponent<SearchMapProps> {
    private editableFeatureGroupRef: any = null;

    render() {
        return (
            <Map center={this.props.position} zoom={this.props.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <TileLayer
                    url="https://gis.ngdc.noaa.gov/arcgis/rest/services/web_mercator/gebco_2014_contours/MapServer/tile/{z}/{y}/{x}"
                    attribution="&copy; <a href=&quot;https://www.gebco.net/data_and_products/gridded_bathymetry_data/&quot;>GEBCO</a>, <a href=&quot;https://maps.ngdc.noaa.gov/&quot;>NOAHH</a> and contributors"
                />
                <TileLayer
                    url="https://a.tiles.mapbox.com/v3/mapbox.natural-earth-2/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;https://www.naturalearthdata.com/&quot;>MapBox</a>, <a href=&quot;https://www.mapbox.com/&quot;>MapBox</a> and contributors"
                />

                <Marker position={this.props.position}>
                    <Popup>A pretty CSS3 popup.<br/>Easily customizable.</Popup>
                </Marker>

                <MarkerClusterGroup>
                    {MARKERS}
                </MarkerClusterGroup>

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


function randomGaussian(): number {
    let u = 0, v = 0;
    //Converting [0,1) to (0,1)
    while (u === 0) {
        u = Math.random();
    }
    while (v === 0) {
        v = Math.random();
    }
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) {
        // resample between 0 and 1
        return randomGaussian();
    }
    return num;
}

function createMarker(lat: number, lon: number, i: number) {
    return <Marker position={new LatLng(lat, lon)}><Popup>ID {i}</Popup></Marker>;
}

function createRandomMarkers(minPoints: number, maxPoints: number) {
    const centerPoints = [
        [41.2, 5.4],
        [36.2, 18.5],
        [40.8, -13.5],
        [35.2, -8.2],
        [55.9, 4.2],
        [58.1, 1.6],
    ];

    const points = [];

    const v1 = 0.05;
    const v2 = 0.05;
    const v3 = 0.2;
    for (let i = 0; i < centerPoints.length; i++) {
        const lat0 = centerPoints[i][0];
        const lon0 = centerPoints[i][1];
        const numPoints = Math.floor(minPoints + (maxPoints - minPoints) * Math.random());
        if (Math.floor(2 * Math.random()) == 0) {
            let lat = lat0, lon = lon0;
            let dx = -1 + 2 * Math.random();
            let dy = -1 + 2 * Math.random();
            for (let j = 0; j < numPoints; j++) {
                lat += v1 * dy;
                lon += v1 * dx;
                dx += v2 * Math.random();
                dy += v2 * Math.random();
                points.push(createMarker(lat, lon, i));
            }
        } else {
            for (let j = 0; j < numPoints; j++) {
                const lat = lat0 + v3 * randomGaussian();
                const lon = lon0 + v3 * randomGaussian();
                points.push(<Marker position={new LatLng(lat, lon)}/>);
            }
        }
    }

    return points;
}


//
// // data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176
//
// function getGeoJson(): any {
//     return {
//         'type': 'FeatureCollection',
//         'features': [
//             {
//                 'type': 'Feature',
//                 'properties': {},
//                 'geometry': {
//                     'type': 'LineString',
//                     'coordinates': [
//                         [
//                             -122.47979164123535,
//                             37.830124319877235
//                         ],
//                         [
//                             -122.47721672058105,
//                             37.809377088502615
//                         ]
//                     ]
//                 }
//             },
//             {
//                 'type': 'Feature',
//                 'properties': {},
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [
//                         -122.46923446655273,
//                         37.80293476836673
//                     ]
//                 }
//             },
//             {
//                 'type': 'Feature',
//                 'properties': {},
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [
//                         -122.48399734497069,
//                         37.83466623607849
//                     ]
//                 }
//             },
//             {
//                 'type': 'Feature',
//                 'properties': {},
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [
//                         -122.47867584228514,
//                         37.81893781173967
//                     ]
//                 }
//             },
//             {
//                 'type': 'Feature',
//                 'properties': {},
//                 'geometry': {
//                     'type': 'Polygon',
//                     'coordinates': [
//                         [
//                             [
//                                 -122.48069286346434,
//                                 37.800637436707525
//                             ],
//                             [
//                                 -122.48069286346434,
//                                 37.803104310307276
//                             ],
//                             [
//                                 -122.47950196266174,
//                                 37.803104310307276
//                             ],
//                             [
//                                 -122.47950196266174,
//                                 37.800637436707525
//                             ],
//                             [
//                                 -122.48069286346434,
//                                 37.800637436707525
//                             ]
//                         ]
//                     ]
//                 }
//             },
//             {
//                 'type': 'Feature',
//                 'properties': {},
//                 'geometry': {
//                     'type': 'Polygon',
//                     'coordinates': [
//                         [
//                             [
//                                 -122.48103886842728,
//                                 37.833075326166274
//                             ],
//                             [
//                                 -122.48065531253813,
//                                 37.832558431940114
//                             ],
//                             [
//                                 -122.4799284338951,
//                                 37.8322660885204
//                             ],
//                             [
//                                 -122.47963070869446,
//                                 37.83231693093747
//                             ],
//                             [
//                                 -122.47948586940764,
//                                 37.832467339549524
//                             ],
//                             [
//                                 -122.47945636510849,
//                                 37.83273426112019
//                             ],
//                             [
//                                 -122.47959315776825,
//                                 37.83289737938241
//                             ],
//                             [
//                                 -122.48004108667372,
//                                 37.833109220743104
//                             ],
//                             [
//                                 -122.48058557510376,
//                                 37.83328293020496
//                             ],
//                             [
//                                 -122.48080283403395,
//                                 37.83332529830436
//                             ],
//                             [
//                                 -122.48091548681259,
//                                 37.83322785163939
//                             ],
//                             [
//                                 -122.48103886842728,
//                                 37.833075326166274
//                             ]
//                         ]
//                     ]
//                 }
//             },
//             {
//                 'type': 'Feature',
//                 'properties': {},
//                 'geometry': {
//                     'type': 'Polygon',
//                     'coordinates': [
//                         [
//                             [
//                                 -122.48043537139893,
//                                 37.82564992009924
//                             ],
//                             [
//                                 -122.48129367828368,
//                                 37.82629397920697
//                             ],
//                             [
//                                 -122.48240947723389,
//                                 37.82544653184479
//                             ],
//                             [
//                                 -122.48373985290527,
//                                 37.82632787689904
//                             ],
//                             [
//                                 -122.48425483703613,
//                                 37.82680244295304
//                             ],
//                             [
//                                 -122.48605728149415,
//                                 37.82639567223645
//                             ],
//                             [
//                                 -122.4898338317871,
//                                 37.82663295542695
//                             ],
//                             [
//                                 -122.4930953979492,
//                                 37.82415839321614
//                             ],
//                             [
//                                 -122.49700069427489,
//                                 37.821887146654376
//                             ],
//                             [
//                                 -122.4991464614868,
//                                 37.82171764783966
//                             ],
//                             [
//                                 -122.49850273132326,
//                                 37.81798857543524
//                             ],
//                             [
//                                 -122.50923156738281,
//                                 37.82090404811055
//                             ],
//                             [
//                                 -122.51232147216798,
//                                 37.823344820392535
//                             ],
//                             [
//                                 -122.50150680541992,
//                                 37.8271414168374
//                             ],
//                             [
//                                 -122.48743057250977,
//                                 37.83093781796035
//                             ],
//                             [
//                                 -122.48313903808594,
//                                 37.82822612280363
//                             ],
//                             [
//                                 -122.48043537139893,
//                                 37.82564992009924
//                             ]
//                         ]
//                     ]
//                 }
//             }
//         ]
//     };
// }
