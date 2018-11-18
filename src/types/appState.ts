import { SearchMapState } from './searchMapState';
import { SearchFormState } from './searchFormState';
import { DashboardState } from "./dashboardState";

export interface AppState {
    searchFormState: SearchFormState;
    searchMapState: SearchMapState;
    dashboardState:  DashboardState;
}
