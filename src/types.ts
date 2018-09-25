export type MeasurementData = JSON;


export interface StoreState {
    queryString?: string;
    data?: MeasurementData;
    start?: number;
    offset?: number;
    type: string;
}


