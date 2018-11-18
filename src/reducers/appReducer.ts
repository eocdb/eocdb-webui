import { combineReducers } from 'redux';
import { searchMapReducer } from './searchMapReducer';
import { dashboardReducer } from './dashboardReducer';

export const appReducer = combineReducers(
    {
        searchMapState: searchMapReducer,
        dashboardState: dashboardReducer,
    }
);
