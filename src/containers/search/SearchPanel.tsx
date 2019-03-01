import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import {
    updateDatasetQuery,
    searchDatasets,
    startLoading
} from '../../actions/searchFormActions';
import SearchPanel from '../../components/search/SearchPanel';
import {
    closeAdvancedSearchDialog,
    closeHelpDialog,
    openAdvancedSearchDialog,
    openHelpDialog,
} from "../../actions/dashboardActions";


const mapStateToProps = (state: AppState) => {
    return {
        datasetQuery: state.searchFormState.datasetQuery,
        serverInfo: state.dataState.info,
        advancedSearchDialogOpen: state.dashboardState.advancedSearchDialogOpen,
        helpDialogOpen: state.dashboardState.helpDialogOpen,
        loading: state.searchFormState.loading,
    };
};

const mapDispatchToProps = {
    updateDatasetQuery,
    searchDatasets,

    openAdvancedSearchDialog,
    closeAdvancedSearchDialog,

    openHelpDialog,
    closeHelpDialog,

    startLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
