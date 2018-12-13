import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import { updateDatasetQuery, searchDatasets } from '../../actions/searchFormActions';
import SearchPanel from '../../components/search/SearchPanel';
import { closeAdvancedSearchDialog, openAdvancedSearchDialog } from "../../actions/dashboardActions";

const mapStateToProps = (state: AppState) => {
    return {
        datasetQuery: state.searchFormState.datasetQuery,
        serverInfo: state.dataState.info,
        advancedSearchDialogOpen: state.dashboardState.advancedSearchDialogOpen,
    };
};

const mapDispatchToProps = {
    updateDatasetQuery,
    searchDatasets,
    openAdvancedSearchDialog,
    closeAdvancedSearchDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
