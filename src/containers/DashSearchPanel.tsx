import { connect } from 'react-redux';

import { AppState } from '../types/appState';
import { searchDatasets } from '../actions/searchFormActions';
import DashSearchPanel from '../components/DashSearchPanel';

const mapStateToProps = (state: AppState) => {
    return {
        /* TODO */
    };
};

const mapDispatchToProps = {
    searchDatasets,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashSearchPanel);
