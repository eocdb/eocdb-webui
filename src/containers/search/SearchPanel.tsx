import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import {
    updateDatasetQuery,
    searchDatasets,
    startLoading, updateSearchHistory, updateSaveSearchTitle
} from '../../actions/findActions';
import SearchPanel from '../../components/search/SearchPanel';
import {
    closeAdvancedSearchDialog,
    closeHelpDialog, closeSaveSearchDialog,
    openAdvancedSearchDialog,
    openHelpDialog, openSaveSearchDialog,
} from "../../actions/dashboardActions";
import {
    updateOptShallow,
    updateProducts,
    updateProductValue,
    updateWaterDepth,
    updateWavelength
} from "../../actions/advancedFindActions";


const mapStateToProps = (state: AppState) => {
    return {
        datasetQuery: state.searchFormState.datasetQuery,
        serverInfo: state.dataState.info,
        advancedSearchDialogOpen: state.dashboardState.advancedSearchDialogOpen,
        saveSearchDialogOpen: state.dashboardState.saveSearchDialogOpen,
        helpDialogOpen: state.dashboardState.helpDialogOpen,
        loading: state.searchFormState.loading,

        //searchHistory: state.searchFormState.searchHistory,
        saveSearchTitle: state.searchFormState.saveSearchTitle,

        // Advanced Find
        selectedWavelength: state.advancedSearchState.selectedWavelength,
        selectedWaterDepth: state.advancedSearchState.waterDepth,
        selectedOptShallow: state.advancedSearchState.selectedOptShallow,
        selectedProducts: state.advancedSearchState.selectedProducts,
        productInputValue: state.advancedSearchState.productInputValue,
    };
};

const mapDispatchToProps = {
    updateDatasetQuery,
    searchDatasets,

    openAdvancedSearchDialog,
    closeAdvancedSearchDialog,

    openSaveSearchDialog,
    closeSaveSearchDialog,

    openHelpDialog,
    closeHelpDialog,

    startLoading,

    updateSearchHistory,
    updateSaveSearchTitle,

    // Advanced Search
    updateWavelength,
    updateWaterDepth,
    updateOptShallow,
    updateProducts,
    updateProductValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
