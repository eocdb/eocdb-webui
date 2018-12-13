import { DEFAULT_API_SERVER_URL, DEFAULT_API_SERVER_AUTH } from '../api/config';

export interface ConfigState {
    apiServerUrl: string;
    apiServerAuth: string;
}

export function newConfigState() {
    return {
        apiServerUrl: DEFAULT_API_SERVER_URL,
        apiServerAuth: DEFAULT_API_SERVER_AUTH,
    }
}