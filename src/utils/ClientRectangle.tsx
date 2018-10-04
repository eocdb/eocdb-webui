import { GeoRectangle, Rectangle } from "../types";


const GEO_RECT_360: Rectangle = {
    x: -180,
    y: -90,
    width: 360,
    height: 180,
};


const GEO_RECT_0: Rectangle = {
    x: 0,
    y: -90,
    width: 360,
    height: 180,
};


const CLIENT_RECT: Rectangle = {
    x: 0,
    y: 0,
    width: 512,
    height: 256,
};


class ClientRectangle {
    _refRect: Rectangle;
    _prjRect: Rectangle;
    _clientRectMode: boolean;

    constructor(prjRect: Rectangle, clientRect: Rectangle = CLIENT_RECT, clientRectMode: boolean = true) {
        this._refRect = clientRect;
        this._prjRect = prjRect;
        this._clientRectMode = clientRectMode;
    }

    public geoRect(clientRect: Rectangle): GeoRectangle {
        const ratioX = this._refRect.width / this._prjRect.width;
        const ratioY = this._refRect.height / this._prjRect.height;
        const width = clientRect.width * ratioX;
        const height = clientRect.height * ratioY;

        const x = this._prjRect.x + clientRect.x * ratioX;
        let y = 0;
        if (this._clientRectMode) {
            y = this._prjRect.y - this._refRect.y * ratioY;
        }
        else {
            y = this._prjRect.y + this._refRect.y * ratioY;
        }

        return {
            west: x,
            east: x + width,
            south: y,
            north: y + height,
        }
    }

    public imgRect(geoRect: GeoRectangle): Rectangle {
        const ratioX = this._prjRect.width / this._refRect.width;
        const ratioY = this._prjRect.height / this._refRect.height;

        const width = (geoRect.east - geoRect.west)* ratioX;
        const height = (geoRect.north - geoRect.south )* ratioY;

        const x = this._prjRect.x + geoRect.east * ratioX;

        let y = 0;
        if (this._clientRectMode) {
            y = this._prjRect.y + geoRect.south * ratioY;
        }
        else {
            y = this._prjRect.y - geoRect.south * ratioY;
        }

        return {
            x: x,
            y: y,
            width: width,
            height: height,
        }
    }
}

export const GEO_CLIENT_RECT_360 = new ClientRectangle(CLIENT_RECT, GEO_RECT_360);
export const GEO_CLIENT_RECT_0 = new ClientRectangle(CLIENT_RECT, GEO_RECT_0);
