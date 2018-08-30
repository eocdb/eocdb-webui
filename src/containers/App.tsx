import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';
import { queryMeasurements, EocdbAction } from '../actions';
import { StoreState } from '../types';



export function mapStateToProps(state: StoreState) {
    return {
        data: state.data,
        queryString: state.queryString
    };
}


export function mapDispatchToProps(dispatch: Dispatch<EocdbAction>) {
    return {
        onQueryMeasurements: (queryString: string) => dispatch(queryMeasurements(queryString) as any) /* TODO: Fix "as any" */
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App as any);
