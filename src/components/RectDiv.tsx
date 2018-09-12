import * as React from 'react';

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface RectDivProps {
    id: string;
    opacity?: number;
    rectangle: Rectangle;
}

export class RectDiv extends React.PureComponent<RectDivProps> {
    private static readonly RECT_STYLE = {
        border: "3px solid orange",
        display: "block",
        position: "relative",
        //borderRadius: '50%',
        //zIndex: 5,
        backgroundColor: "white",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    } as React.CSSProperties;

    constructor(props: RectDivProps) {
        super(props);
    }


    render() {
        const r = this.props.rectangle;

        if (!r) {
            return null;
        }

        let opacity = 0;
        if(this.props.opacity){
            opacity = this.props.opacity;
        }

        const style = {...RectDiv.RECT_STYLE, left: r.x, top: r.y, width: r.width, height: r.height, opacity: opacity};

        return (
            <div style={style} id={this.props.id}>a</div>
        );
    };

}

