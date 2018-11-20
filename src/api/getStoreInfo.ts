import { callJsonApi } from "./callApi";
import { StoreInfo } from "../types/dataset";

export function getStoreInfo(apiServerUrl: string){
    return callJsonApi<StoreInfo>(apiServerUrl + '/store/info');
}