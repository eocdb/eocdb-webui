import { combineReducers } from 'redux';
import { configReducer } from './configReducer';
import { dashboardReducer } from './dashboardReducer';
import { searchMapReducer } from './searchMapReducer';
import { searchFormReducer } from './searchFormReducer';

export const appReducer = combineReducers(
    {
        configState: configReducer,
        dashboardState: dashboardReducer,
        searchFormState: searchFormReducer,
        searchMapState: searchMapReducer,
    }
);
