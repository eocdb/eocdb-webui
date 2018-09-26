import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { App, AppDispatchProps, AppStateProps } from "../components/App";

import { queryMeasurements, offsetResults, regionChange } from '../actions';
import { Rectangle, StoreState } from '../types';


export function mapStateToProps(state: StoreState): AppStateProps {
    return {
        data: state.data,
        queryString: state.queryString ? state.queryString : "",
        start: state.start,
        offset: state.offset,
        rectangle: state.rectangle,
    };
}


export function mapDispatchToProps(dispatch: Dispatch): AppDispatchProps {
    return {
        onQueryMeasurements: (queryString: string) => dispatch(queryMeasurements(queryString) as any), /* TO: Fix "as any" */
        onPageChange: (start: number, offset: number) => dispatch(offsetResults(start, offset) as any),
        onRegionChange: (rectangle: Rectangle) => dispatch(regionChange(rectangle) as any)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
