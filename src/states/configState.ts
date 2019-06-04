import { SERVER_CONFIG } from "../api/config";
import { MatchupFiles } from "../model/MatchupFiles";

export interface ConfigState {
    apiServerUrl: string;
    matchupFiles: MatchupFiles[];
}

export function newConfigState() {
    return {
        apiServerUrl: SERVER_CONFIG,
        matchupFiles: [],
    }
}