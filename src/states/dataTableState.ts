import { Dataset } from "../types/dataset";

export interface DataTableState {
    page: number;
    rowsPerPage: number;

    metaInfoDialogOpen: boolean;

    dataset: Dataset;
}

export function newDataTableState() {
    return {
        page: 0,
        rowsPerPage: 5,

        metaInfoDialogOpen: false,

        dataset: {
            id: "",
            path: '',
            metadata: {
                intidentifier_product_doi: '',
                received: '',
                investigators: '',
                affiliations: '',
                contact: '',
                experiment: '',
                cruise: '',
                station: '',
                data_file_name: '',
                documents: '',
                calibration_files: '',
                instrument: '',
                data_type: '',
                data_status: '',
                start_date: '',
                end_date: '',
                start_time: '',
                end_time: '',
                north_latitude: '',
                south_latitude: '',
                east_longitude: '',
                west_longitude: '',
                water_depth: '',
                secchi_depth: '',
                cloud_percent: '',
                wind_speed: '',
                wave_height: '',
                missing: '',
                delimiter: '',
                units: '',
            },
            records: [],
            longitudes: [],
            latiudes: [],
            attribures: [],
            times: [],
        },
    }
}