import { callJsonApi } from "./callApi";
import { Info } from "../types/dataset";

export function getInfo(apiServerUrl: string){
    return callJsonApi<Info>(apiServerUrl + '/store/info');
}