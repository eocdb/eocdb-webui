import { combineReducers } from 'redux';
import { configReducer } from './configReducer';
import { dashboardReducer } from './dashboardReducer';
import { searchMapReducer } from './searchMapReducer';
import { findReducer } from './findReducer';
import { messageLogReducer } from "./messageLogReducer";
import { sessionReducer } from './sessionReducer';
import { dataReducer } from "./dataReducer";
import { dataTableReducer } from "./dataTableReducer";
import { advancedSearchReducer } from "./advancedSearchReducer";
import { submissionReducer } from "./submissionReducer";
import { alertReducer } from "./alertReducer";
import {adminReducer} from "./adminReducer";

export const appReducer = combineReducers(
    {
        configState: configReducer,
        dashboardState: dashboardReducer,
        searchFormState: findReducer,
        searchMapState: searchMapReducer,
        messageLogState: messageLogReducer,
        alertState: alertReducer,
        sessionState: sessionReducer,
        dataState: dataReducer,
        dataTableState: dataTableReducer,
        advancedSearchState: advancedSearchReducer,
        submissionState: submissionReducer,
        linksPageState: adminReducer,
    }
);
