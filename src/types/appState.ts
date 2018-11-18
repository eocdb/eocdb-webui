import { SearchMapState } from './searchMapState';
import { DashboardState } from "./dashboardState";

export interface AppState {
    searchMapState: SearchMapState;
    dashboardState:  DashboardState;
}
