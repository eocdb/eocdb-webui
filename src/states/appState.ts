import { ConfigState } from "./configState";
import { DashboardState } from "./dashboardState";
import { SearchMapState } from './searchMapState';
import { SearchFormState } from './searchFormState';
import { MessageLogState } from "./messageLogState";
import { DataState } from "./dataState";

export interface AppState {
    configState:  ConfigState;
    dashboardState:  DashboardState;
    searchFormState: SearchFormState;
    searchMapState: SearchMapState;
    messageLogState: MessageLogState;
    dataState: DataState;
}
