import { connect } from 'react-redux';

import { AppState } from '../states/appState';
import { searchDatasets } from '../actions/searchFormActions';
import PanelSearch from '../components/panels/PanelSearch';

const mapStateToProps = (state: AppState) => {
    return {
        /* TODO */
    };
};

const mapDispatchToProps = {
    searchDatasets,
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelSearch);
