import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { App, AppDispatchProps, AppStateProps } from "../components/App";

import { queryMeasurements  } from '../actions';
import { StoreState } from '../types';


export function mapStateToProps(state: StoreState): AppStateProps {
    return {
        data: state.data,
        queryString: state.queryString ? state.queryString : ""
    };
}


export function mapDispatchToProps(dispatch: Dispatch): AppDispatchProps {
    return {
        onQueryMeasurements: (queryString: string) => dispatch(queryMeasurements(queryString) as any) /* TODO: Fix "as any" */
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
