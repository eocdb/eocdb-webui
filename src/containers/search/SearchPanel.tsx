import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import {
    updateDatasetQuery,
    searchDatasets,
    startLoading, updateSearchHistory
} from '../../actions/findActions';
import SearchPanel from '../../components/search/SearchPanel';
import {
    closeAdvancedSearchDialog,
    closeHelpDialog,
    openAdvancedSearchDialog,
    openHelpDialog,
} from "../../actions/dashboardActions";
import {
    updateBBox,
    updateOptShallow,
    updateProducts, updateProductValue,
    updateWaterDepth,
    updateWavelength
} from "../../actions/advancedFindActions";


const mapStateToProps = (state: AppState) => {
    return {
        datasetQuery: state.searchFormState.datasetQuery,
        serverInfo: state.dataState.info,
        advancedSearchDialogOpen: state.dashboardState.advancedSearchDialogOpen,
        helpDialogOpen: state.dashboardState.helpDialogOpen,
        loading: state.searchFormState.loading,

        searchHistory: state.searchFormState.searchHistory,

        // Advanced Find
        selectedBBox: state.advancedSearchState.selectedBBox,
        mapBBox: state.searchMapState.selectedBounds,
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

    openHelpDialog,
    closeHelpDialog,

    startLoading,

    updateSearchHistory,

    // Advanced Search
    updateBBox,
    updateWavelength,
    updateWaterDepth,
    updateOptShallow,
    updateProducts,
    updateProductValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
