import * as React from 'react';
import { CSSProperties } from "react";
import { Button, NumericInput } from '@blueprintjs/core';

import { RectDiv } from "./RectDiv";
import { GEO_CLIENT_RECT_0, GEO_CLIENT_RECT_360 } from "../utils/ClientRectangle";
import { valBetween } from "./utils";
import { GeoRectangle, Rectangle } from "../types";

import map_atlantic from './blue_marble_xs.jpg';
import map_pacific from './blue_marble_xs_pacific.jpg';
import './RegionSelect.css'

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import Select from 'ol/interaction/Select';
import DragBox from 'ol/interaction/DragBox';
import { events } from "openlayers";
import click = events.condition.click;
import platformModifierKeyOnly = events.condition.platformModifierKeyOnly;


interface OLState {
    selected: number;
    deselected: number;
    numFeat: number;
}

interface OLProps {
    id: string;
    onRegionChange: (rect: GeoRectangle) => void;
    onSearchSuccess: (success: boolean) => void;
}

export class OL extends React.PureComponent<OLProps, OLState> {

    map: Map | undefined = undefined;
    dragBox: DragBox | undefined;

    constructor(props: OLProps) {
        super(props);

        this.state = {
            selected: 0,
            deselected: 0,
            numFeat: 0,
        };
    }

    buildMap(): Map {
        const layers = [
            new TileLayer({
                source: new OSM()
            }),
        ];

        const map = new Map({
            layers: layers,
            target: 'map',
            view: new View({
                projection: 'EPSG:4326',
                center: [0, 0],
                zoom: 4
            })
        });

        const selectSingleClick = new Select({
                condition: click
            }
        );
        map.addInteraction(selectSingleClick);

        this.dragBox = new DragBox({
            condition: platformModifierKeyOnly
        });

        this.dragBox.on('boxend', this.handleOnFeatureDragBoxSelect);

        map.addInteraction(this.dragBox);

        selectSingleClick.on('select', this.handleOnFeatureSelect);

        return map;
    }

    handleOnFeatureSelect = (e: Select.Event) => {
        console.log(e.target.getFeatures());
        this.setState(
            {
                selected: e.selected.length,
                deselected: e.deselected.length,
                numFeat: e.target.getFeatures().getLength(),
            }
        );
    };

    handleOnFeatureDragBoxSelect = () => {
        if (this.dragBox) {
            const extent = this.dragBox.getGeometry().getExtent();
            const rect = {
                west: extent[0],
                south: extent[1],
                north: extent[2],
                east: extent[3],
            };
            this.props.onRegionChange(rect);
            this.props.onSearchSuccess(true);
        }
    };

    componentDidMount() {
        this.map = this.buildMap();
    }

    render() {
        return (
            <div>
                <div id="map" className="Map"/>
                <br/>
                <br/>
            </div>
        );
    }
}


interface RegionSelectProps {
    id: string;
    idRect?: string;
    onRegionChange: (rectangle: Rectangle) => void;
}


interface RegionSelectState {
    rectangle: Rectangle;
    geo_rectangle: GeoRectangle;
    opacity: number;
    map: string;
    centre: number;
    prevent_send: boolean;
}


export class RegionSelect extends React.PureComponent<RegionSelectProps, RegionSelectState> {
    private static readonly IMG_DIV_STYLE = {
        cursor: "crosshair",
        userSelect: "none",
        zIndex: 6,
    } as React.CSSProperties;

    private static readonly WRAP_DIV_STYLE = {
        margin: "auto",
        width: "512px",
    } as React.CSSProperties;

    private static readonly BUTTON_STYLE = {
        margin: '10pt',
    } as React.CSSProperties;

    constructor(props: RegionSelectProps) {
        super(props);

        this.state = {
            rectangle: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            geo_rectangle: {
                west: 0,
                east: 0,
                south: 0,
                north: 0,
            },
            opacity: 0,
            map: map_atlantic,
            centre: 0,
            prevent_send: true,
        };
    }

    static getRectangle(x: number, y: number, width: number, height: number): Rectangle {
        return {
            x: x,
            y: y,
            width: width,
            height: height,
        };
    }

    static getGeoRectangle(rect: Rectangle, centre: number): GeoRectangle {
        if (centre === 0) {
            return GEO_CLIENT_RECT_0.geoRect(rect);
        }
        else {
            return GEO_CLIENT_RECT_360.geoRect(rect);
        }
    }

    static getImgRectangle(rect: GeoRectangle, centre: number): Rectangle {
        if (centre === 0) {
            return GEO_CLIENT_RECT_0.imgRect(rect);
        }
        else {
            return GEO_CLIENT_RECT_360.imgRect(rect);
        }
    }

    handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        const parentDiv = event.currentTarget;
        const clientRect = parentDiv.getBoundingClientRect();

        const x = Math.round(event.clientX - clientRect.left);
        const y = Math.round(event.clientY - clientRect.top);

        const rect = RegionSelect.getRectangle(x, y, 0, 0);
        const geo_rect = RegionSelect.getGeoRectangle(rect, this.state.centre);

        this.setState({
            rectangle: rect,
            geo_rectangle: geo_rect,
            opacity: 0.25,
            prevent_send: true,
        });
    };

    handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!this.state.prevent_send) {
            const parentDiv = event.currentTarget;
            const clientRect = parentDiv.getBoundingClientRect();

            const x = Math.round(event.clientX - clientRect.left);
            const y = Math.round(event.clientY - clientRect.top);

            const width = Math.round(x - this.state.rectangle.x);
            const height = Math.round(y - this.state.rectangle.y);

            const rect = RegionSelect.getRectangle(this.state.rectangle.x, this.state.rectangle.y, width, height);
            const geo_rect = RegionSelect.getGeoRectangle(rect, this.state.centre);

            this.props.onRegionChange(rect);

            this.setState({
                rectangle: rect,
                geo_rectangle: geo_rect,
                opacity: 0.25,
                prevent_send: true,
            });
        }
    };

    handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.buttons === 1) {
            const parentDiv = event.currentTarget;
            const clientRect = parentDiv.getBoundingClientRect();

            const x = Math.round(event.clientX - clientRect.left);
            const y = Math.round(event.clientY - clientRect.top);

            const width = Math.round(x - this.state.rectangle.x);
            const height = Math.round(y - this.state.rectangle.y);

            const rect = RegionSelect.getRectangle(this.state.rectangle.x, this.state.rectangle.y, width, height);
            const geo_rect = RegionSelect.getGeoRectangle(rect, this.state.centre);

            this.setState({
                rectangle: rect,
                geo_rectangle: geo_rect,
                opacity: 0.25,
                prevent_send: false,
            });
        }
    };

    handleOn0Click = () => {
        this.setState(
            {
                map: map_atlantic,
                centre: 0,
            }
        );
    };

    handleOn180Click = () => {
        this.setState(
            {
                map: map_pacific,
                centre: 180,
            }
        );
    };

    handleOnReset = () => {
        const rect = RegionSelect.getRectangle(0, 0, 0, 0,);
        const geo_rect = RegionSelect.getGeoRectangle(rect, this.state.centre);

        this.props.onRegionChange(rect);

        this.setState({
            rectangle: rect,
            geo_rectangle: geo_rect,
            opacity: 0,
            prevent_send: true,
        });
    };

    handleLeftChange = (valueAsNumber: number) => {
        const max = 512 - this.state.rectangle.width;
        const value = valBetween(Math.round(valueAsNumber), 0, max);

        const geo_rect = {...this.state.geo_rectangle, west: value};

        //const rect = RegionSelect.getImgRectangle(georect);

        const rect = {
            x: value,
            y: this.state.rectangle.y,
            width: this.state.rectangle.width,
            height: this.state.rectangle.height
        };

        this.props.onRegionChange(rect);

        this.setState({
            rectangle: rect,
            geo_rectangle: geo_rect,
            opacity: 0.25,
        });
    };

    handleTopChange = (valueAsNumber: number) => {
        const value = Math.round(valueAsNumber);

        const geo_rect = {...this.state.geo_rectangle, east: value};

        const rect = RegionSelect.getRectangle(
            this.state.rectangle.x,
            value,
            this.state.rectangle.width,
            this.state.rectangle.height
        );

        this.props.onRegionChange(rect);

        this.setState({
            rectangle: rect,
            geo_rectangle: geo_rect,
            opacity: 0.25,
        });
    };

    handleRightChange = (valueAsNumber: number) => {
        const value = Math.round(valueAsNumber);

        const geo_rect = {...this.state.geo_rectangle, north: value};

        const rect = RegionSelect.getRectangle(
            this.state.rectangle.x,
            this.state.rectangle.y,
            value,
            this.state.rectangle.height
        );

        this.props.onRegionChange(rect);

        this.setState({
            rectangle: rect,
            geo_rectangle: geo_rect,
            opacity: 0.25,
        });
    };

    handleBottomChange = (valueAsNumber: number) => {
        const value = Math.round(valueAsNumber);

        const geo_rect = {...this.state.geo_rectangle, south: value};

        const rect = RegionSelect.getRectangle(
            this.state.rectangle.x,
            this.state.rectangle.y,
            this.state.rectangle.width,
            value,
        );

        this.props.onRegionChange(rect);

        this.setState({
            rectangle: rect,
            geo_rectangle: geo_rect,
            opacity: 0.25,
        });
    };

    render() {
        const istyle = {
            ...RegionSelect.IMG_DIV_STYLE,
            backgroundImage: 'url(' + this.state.map + ')',
            left: 0,
            top: 0,
            width: 512,
            height: 256
        };

        let idRect = 'canvas-rect';
        if (this.props.idRect) {
            idRect = this.props.idRect;
        }

        const st = {
            width: '80px',
        } as React.CSSProperties;

        return (
            <div style={RegionSelect.WRAP_DIV_STYLE}>
                <Button style={RegionSelect.BUTTON_STYLE} text={"centre at 0 degrees"} onClick={this.handleOn0Click}/>
                <Button style={RegionSelect.BUTTON_STYLE} text={"centre at 180 degrees"}
                        onClick={this.handleOn180Click}/>

                <div
                    style={istyle}
                    id={this.props.id}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                >
                    <RectDiv id={idRect} opacity={this.state.opacity} rectangle={this.state.rectangle}/>
                </div>

                <table style={{margin: 'auto'} as CSSProperties} cellPadding={'10px'}>
                    <tbody>
                    <tr>
                        <td/>
                        <td>
                            <NumericInput
                                style={st}
                                value={this.state.rectangle.y}
                                onValueChange={this.handleTopChange}
                                leftIcon={"arrow-up"}
                            />
                        </td>
                        <td/>
                    </tr>

                    <tr>
                        <td>
                            <NumericInput
                                style={st}
                                value={this.state.rectangle.x}
                                onValueChange={this.handleLeftChange}
                                leftIcon={"arrow-left"}
                            />
                        </td>
                        <td>
                            <Button icon="refresh" text={"Reset"} onClick={this.handleOnReset}/>
                        </td>
                        <td>
                            <NumericInput
                                style={st}
                                value={this.state.rectangle.width}
                                onValueChange={this.handleRightChange}
                                leftIcon={"arrow-right"}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td/>
                        <td>
                            <NumericInput
                                style={st}
                                value={this.state.rectangle.height}
                                onValueChange={this.handleBottomChange}
                                leftIcon={"arrow-down"}
                            />
                        </td>
                        <td/>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    };

}

