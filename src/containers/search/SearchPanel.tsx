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
    closeProductGroups,
    openAdvancedSearchDialog,
    openProductGroups
} from "../../actions/dashboardActions";
import { logChange } from "../../actions/advancedSearchActions";

const mapStateToProps = (state: AppState) => {
    return {
        datasetQuery: state.searchFormState.datasetQuery,
        serverInfo: state.dataState.info,
        advancedSearchDialogOpen: state.dashboardState.advancedSearchDialogOpen,
        productGroupsOpen: state.dashboardState.productGroupsOpen,
        advancedFilterLog: state.advancedSearchState.filterLog,
        loading: state.searchFormState.loading,
    };
};

const mapDispatchToProps = {
    updateDatasetQuery,
    searchDatasets,

    openAdvancedSearchDialog,
    closeAdvancedSearchDialog,

    openProductGroups,
    closeProductGroups,
    advancedFilterChange: logChange,

    startLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
