export const CONFIG_SERVER = 'CONFIG_SERVER';
export type CONFIG_SERVER = typeof CONFIG_SERVER;

export interface ConfigServer {
    type: CONFIG_SERVER;
    apiServerUrl: string;
}

export function configServer(apiServerUrl: string): ConfigServer {
    return {type: CONFIG_SERVER, apiServerUrl};
}


export type ConfigAction = ConfigServer;