import { combineReducers } from 'redux';
import { configReducer } from './configReducer';
import { dashboardReducer } from './dashboardReducer';
import { searchMapReducer } from './searchMapReducer';
import { searchFormReducer } from './searchFormReducer';
import { messageLogReducer } from "./messageLogReducer";
import { sessionReducer } from './sessionReducer';
import { dataReducer } from "./dataReducer";
import { dataTableReducer } from "./dataTableReducer";

export const appReducer = combineReducers(
    {
        configState: configReducer,
        dashboardState: dashboardReducer,
        searchFormState: searchFormReducer,
        searchMapState: searchMapReducer,
        messageLogState: messageLogReducer,
        sessionState: sessionReducer,
        dataState: dataReducer,
        dataTableState: dataTableReducer,
    }
);
