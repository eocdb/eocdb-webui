import { combineReducers } from 'redux';
import { searchMapReducer } from './searchMapReducer';

export const appReducer = combineReducers(
    {
        searchMapState: searchMapReducer,
    }
);
