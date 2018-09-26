export type MeasurementData = JSON;


export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}


export interface StoreState {
    queryString?: string;
    data?: MeasurementData;
    start?: number;
    offset?: number;
    rectangle: Rectangle;
    type: string;
}


