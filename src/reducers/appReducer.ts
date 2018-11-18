import { combineReducers } from 'redux';
import { searchMapReducer } from './searchMapReducer';
import { searchFormReducer } from './searchFormReducer';
import { dashboardReducer } from './dashboardReducer';

export const appReducer = combineReducers(
    {
        searchFormState: searchFormReducer,
        searchMapState: searchMapReducer,
        dashboardState: dashboardReducer,
    }
);
