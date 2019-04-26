import { callJsonApi } from "./callApi";
import { StoreInfo } from "../model";

export function getStoreInfo(apiServerUrl: string){
    return callJsonApi<StoreInfo>(apiServerUrl + '/store/info');
}