import { callApi } from './callApi';


export function logoutUser(apiServerUrl: string): Promise<Response> {
    return callApi(apiServerUrl + '/users/logout');
}
