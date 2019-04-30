import { SERVER_CONFIG } from "../api/config";

export interface ConfigState {
    apiServerUrl: string;
}

export function newConfigState() {
    return {
        apiServerUrl: SERVER_CONFIG,
    }
}