import { ConfigState } from "./configState";
import { DashboardState } from "./dashboardState";
import { SearchMapState } from './searchMapState';
import { SearchFormState } from './searchFormState';
import { MessageLogState } from "./messageLogState";
import { SessionState } from './sessionState';

export interface AppState {
    configState:  ConfigState;
    dashboardState:  DashboardState;
    searchFormState: SearchFormState;
    searchMapState: SearchMapState;
    messageLogState: MessageLogState;
    sessionState: SessionState;
}
