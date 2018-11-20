import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import { updateDatasetQuery, searchDatasets } from '../../actions/searchFormActions';
import SearchPanel from '../../components/search/SearchPanel';

const mapStateToProps = (state: AppState) => {
    return {
        datasetQuery: state.searchFormState.datasetQuery,
        serverInfo: state.dataState.info,
    };
};

const mapDispatchToProps = {
    updateDatasetQuery,
    searchDatasets,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
