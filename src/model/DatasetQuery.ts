import { ProductMode } from "../api/findDatasets";


export interface DatasetQuery {
    expr?: string;
    mtype: string;
    startDate?: string;
    endDate?: string;
    time?: string[];
    region?: string;
    pmode?: ProductMode;
    pname?: string[];
    pgroup?: string[];
    shallow: string;
    datasetIds?: string[];
    wdepth: string;
    offset?: number;
    count?: number;
    geojson?: boolean;
}

