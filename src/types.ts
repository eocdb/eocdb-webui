export type MeasurementData = JSON;

export interface StoreState {
    queryString?: string;
    data?: MeasurementData;
}