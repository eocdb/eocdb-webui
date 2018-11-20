import { Info } from "../types/dataset";

export interface DataState {
    info: Info;
}

export function newDataState() {
    return {
        info: {
            products: [{
                name: '',
                units: '',
                description: '',
            }],
            productGroups: [{
                name: '',
                description: '',
            }],
        }
    };
}