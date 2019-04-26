import { DatasetMetaData } from "../types/dataset";


export interface Dataset {
    id: string;
    path: string;
    metadata: DatasetMetaData;
    records: number[][];
    longitudes: number[];
    latiudes: number[];
    attributes: string[];
    times: string[];
}

