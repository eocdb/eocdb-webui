export const SET_API_SERVER_URL = 'SET_API_SERVER_URL';
export type SET_API_SERVER_URL = typeof SET_API_SERVER_URL;

export interface SetAptServerUrl {
    type: SET_API_SERVER_URL;
    apiServerUrl: string;
}

export function configServer(apiServerUrl: string): SetAptServerUrl {
    return {type: SET_API_SERVER_URL, apiServerUrl};
}


export type ConfigAction = SetAptServerUrl;