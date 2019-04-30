import { callApi } from './callApi';


export function loginUser(apiServerUrl: string, name: string, password: string): Promise<Response> {
    return callApi(apiServerUrl + '/users/logout', undefined, {
        method: 'post',
        credentials: "same-origin",
        body: JSON.stringify({username: name, password: password})
    });
}
