import { ConfigState } from "./configState";
import { DashboardState } from "./dashboardState";
import { SearchMapState } from './searchMapState';
import { SearchFormState } from './searchFormState';
import { MessageLogState } from "./messageLogState";
import { SessionState } from './sessionState';
import { DataState } from "./dataState";
import { DataTableState } from "./dataTableState";
import { AdvancedSearchState } from "./advancedSearchState";
import { SubmissionState } from "./submissionState";

export interface AppState {
    configState:  ConfigState;
    dashboardState:  DashboardState;
    searchFormState: SearchFormState;
    searchMapState: SearchMapState;
    messageLogState: MessageLogState;
    sessionState: SessionState;
    dataState: DataState;
    dataTableState: DataTableState;
    advancedSearchState: AdvancedSearchState;
    submitState: SubmissionState;
}
