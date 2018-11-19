import { connect } from 'react-redux';

import { AppState } from '../states/appState';
import { searchDatasets } from '../actions/searchFormActions';
import PanelSearch from '../components/panels/PanelSearch';

const mapStateToProps = (state: AppState) => {
    return {
        ...state.searchFormState.datasetQuery,
    };
};

const mapDispatchToProps = {
    searchDatasets,
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelSearch);
