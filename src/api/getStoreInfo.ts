import { callJsonApi, getRequestInit } from './callApi';
import { StoreInfo } from '../types/dataset';


export function getStoreInfo(apiServerUrl: string, apiServerAuth: string) {
    return callJsonApi<StoreInfo>(
        apiServerUrl + '/store/info',
        undefined,
        getRequestInit(apiServerAuth)
    );
}