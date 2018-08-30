import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';
import * as actions from '../actions';
import { StoreState } from '../types';


export function mapStateToProps(state: StoreState) {
    return {
        data: state.data,
        queryString: state.queryString
    };
}


export function mapDispatchToProps(dispatch: Dispatch<actions.EocdbAction>) {
    return {
        onQueryMeasurements: (queryString: string) => dispatch(actions.queryMeasurements(queryString) as any) /* TODO: Fix "as any" */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
