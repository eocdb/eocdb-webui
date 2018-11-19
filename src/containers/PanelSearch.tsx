import { connect } from 'react-redux';

import { AppState } from '../states/appState';
import { updateDatasetQuery, searchDatasets } from '../actions/searchFormActions';
import PanelSearch from '../components/panels/PanelSearch';

const mapStateToProps = (state: AppState) => {
    return {
        datasetQuery: state.searchFormState.datasetQuery,
    };
};

const mapDispatchToProps = {
    updateDatasetQuery,
    searchDatasets,
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelSearch);
