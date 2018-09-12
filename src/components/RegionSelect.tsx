import * as React from 'react';
import { Button, NumericInput } from '@blueprintjs/core';
import { RectDiv, Rectangle } from "./RectDiv";
import map_atlantic from './blue_marble_xs.jpg';
import map_pacific from './blue_marble_xs_pacific.jpg';


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

    private static  readonly  BUTTON_STYLE = {
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

        const x = event.clientX - clientRect.left;
        const y = event.clientY - clientRect.top;

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

            const x = event.clientX - clientRect.left;
            const y = event.clientY - clientRect.top;

            const width = x - this.state.rectangle.x;
            const height = y - this.state.rectangle.y;

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
        this.setState({
            rectangle:{
                x: valueAsNumber,
                y: this.state.rectangle.y,
                width: this.state.rectangle.width,
                height: this.state.rectangle.height,
            }
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

        const x = this.state.rectangle.x;
        const y = this.state.rectangle.y;
        const w = this.state.rectangle.width;
        const h = this.state.rectangle.height;

        return (
            <div style={RegionSelect.WRAP_DIV_STYLE}>
                <Button style={RegionSelect.BUTTON_STYLE} text={"centre at 0 degrees"} onClick={this.handleOn0Click}/>
                <Button style={RegionSelect.BUTTON_STYLE} text={"centre at 180 degrees"} onClick={this.handleOn180Click}/>
                <div
                    style={istyle}
                    id={this.props.id}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                >
                    <RectDiv id={idRect} opacity={this.state.opacity} rectangle={this.state.rectangle}/>
                </div>
                <NumericInput value={this.state.rectangle.x} onValueChange={this.handleLeftChange} leftIcon={"arrow-left"}/>
                <NumericInput placeholder={(x + w).toString()} leftIcon={"arrow-right"}/>
                <NumericInput placeholder={y.toString()} leftIcon={"arrow-up"}/>
                <NumericInput placeholder={(y + h).toString()} leftIcon={"arrow-down"}/>
                <Button icon="refresh" text={"Reset"} onClick={this.handleOnReset}/>
            </div>
        );
    };

}

