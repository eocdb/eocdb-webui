import * as React from 'react';
import { Button, NumericInput } from '@blueprintjs/core';
import './RegionSelect.css'
import { RectDiv, Rectangle } from "./RectDiv";
import map_atlantic from './blue_marble_xs.jpg';
import map_pacific from './blue_marble_xs_pacific.jpg';
import { CSSProperties } from "react";


interface RegionSelectProps {
    id: string;
    idRect?: string;
}


interface RegionSelectState {
    rectangle: Rectangle;
    opacity: number;
    map: string;
    centre: number;
}


function valBetween(v: number, min: number, max: number) {
    return (Math.min(max, Math.max(min, v)));
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
            opacity: 0,
            map: map_atlantic,
            centre: 0,
        };
    }

    handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        const parentDiv = event.currentTarget;
        const clientRect = parentDiv.getBoundingClientRect();

        const x = Math.round(event.clientX - clientRect.left);
        const y = Math.round(event.clientY - clientRect.top);

        this.setState({
            rectangle: {
                x: x,
                y: y,
                width: 0,
                height: 0,
                opacity: 0.25,
            }
        });
    };

    handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.buttons === 1) {
            const parentDiv = event.currentTarget;
            const clientRect = parentDiv.getBoundingClientRect();

            const x = Math.round(event.clientX - clientRect.left);
            const y = Math.round(event.clientY - clientRect.top);

            const width = Math.round(x - this.state.rectangle.x);
            const height = Math.round(y - this.state.rectangle.y);

            this.setState({
                rectangle: {
                    x: this.state.rectangle.x,
                    y: this.state.rectangle.y,
                    width: width,
                    height: height,
                },
                opacity: 0.25,
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
        this.setState({
            rectangle: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            opacity: 0,
        });
    };

    handleLeftChange = (valueAsNumber: number) => {
        const max = 512 - this.state.rectangle.width;

        const value = valBetween(Math.round(valueAsNumber), 0, max);
        this.setState({
            rectangle: {
                x: value,
                y: this.state.rectangle.y,
                width: this.state.rectangle.width,
                height: this.state.rectangle.height,
            },
            opacity: 0.25,
        });
    };

    handleTopChange = (valueAsNumber: number) => {
        const value = Math.round(valueAsNumber);
        this.setState({
            rectangle: {
                x: this.state.rectangle.x,
                y: value,
                width: this.state.rectangle.width,
                height: this.state.rectangle.height,
            },
            opacity: 0.25,
        });
    };

    handleRightChange = (valueAsNumber: number) => {
        const value = Math.round(valueAsNumber);
        this.setState({
            rectangle: {
                x: this.state.rectangle.x,
                y: this.state.rectangle.y,
                width: value,
                height: this.state.rectangle.height,
            },
            opacity: 0.25,
        });
    };

    handleBottomChange = (valueAsNumber: number) => {
        const value = Math.round(valueAsNumber);
        this.setState({
            rectangle: {
                x: this.state.rectangle.x,
                y: this.state.rectangle.y,
                width: this.state.rectangle.width,
                height: value,
            },
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
                >
                    <RectDiv id={idRect} opacity={this.state.opacity} rectangle={this.state.rectangle}/>
                </div>

                <table style={{margin: 'auto'} as CSSProperties} cellPadding={'10px'}>
                    <tbody>
                    <tr>
                        <td> </td>
                        <td>
                            <NumericInput
                                style={st}
                                value={this.state.rectangle.y}
                                onValueChange={this.handleTopChange}
                                leftIcon={"arrow-up"}
                            />
                        </td>
                        <td> </td>
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
                        <td> </td>
                        <td>
                            <NumericInput
                                style={st}
                                value={this.state.rectangle.height}
                                onValueChange={this.handleBottomChange}
                                leftIcon={"arrow-down"}
                            />
                        </td>
                        <td> </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    };

}

