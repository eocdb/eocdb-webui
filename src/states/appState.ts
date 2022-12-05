import { ConfigState } from "./configState";
import { DashboardState } from "./dashboardState";
import { SearchMapState } from './searchMapState';
import { SearchFormState } from './searchFormState';
import { MessageLogState } from "./messageLogState";
import { SessionState } from './sessionState';
import { DataState } from "./dataState";
import { DataTableState } from "./dataTableState";
import { SubmissionState } from "./submissionState";
import { LinksPageState } from "./linksPageState";
import { AdminState } from "./adminState";
import { MatchupState } from "./matchupState";
import { UserState } from "./userState";

export interface AppState {
    configState: ConfigState;
    dashboardState: DashboardState;
    searchFormState: SearchFormState;
    searchMapState: SearchMapState;
    messageLogState: MessageLogState;
    sessionState: SessionState;
    dataState: DataState;
    dataTableState: DataTableState;
    submissionState: SubmissionState;
    linksPageState: LinksPageState;
    adminSate: AdminState;
    matchupState: MatchupState;
    userState: UserState;
}
