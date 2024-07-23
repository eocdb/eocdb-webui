import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import {
  updateDatasetQuery,
  searchDatasets,
  startLoading,
  updateSearchHistory,
  updateSaveSearchTitle,
} from "../../actions/findActions";
import SearchPanel from "../../components/search/SearchPanel";
import {
  closeAdvancedSearchDialog,
  closeHelpDialog,
  closeHelpMetaInfoDialog,
  closeProductGroupsHelpDialog,
  closeSaveSearchDialog,
  openAdvancedSearchDialog,
  openHelpDialog,
  openHelpMetaInfoDialog,
  openProductGroupsHelpDialog,
  openSaveSearchDialog,
} from "../../actions/dashboardActions";
import {
  updateOptShallow,
  updateProducts,
  updateWaterDepth,
  updateWavelength,
} from "../../actions/advancedFindActions";
import {
  closeManualBBoxDialog,
  openManualBBoxDialog,
  updateManualBBox,
  updateManualBBoxEast,
  updateManualBBoxNorth,
  updateManualBBoxSouth,
  updateManualBBoxWest,
  updateSelectedRegions,
} from "../../actions/searchMapActions";
import {
  closeMetaInfoDialog,
  closePlotDialog,
  closeTermsDialog,
  downloadDatasets,
  downloadDataset,
  openMetaInfoDialog,
  openPlotDialog,
  openTermsDialog,
  startDownloading,
  updateDataPage,
  updateDataRowsPerPage,
  updateDataset,
  updateDownloadDocs,
  updatePlotData,
  updatePlotState,
  updateSelectedDatasets,
  openTermsSingleDialog,
  closeTermsSingleDialog,
  openTermsDirectDialog,
  closeTermsDirectDialog,
  directDownloadDataset,
} from "../../actions/dataTableActions";

const mapStateToProps = (state: AppState) => {
  return {
    datasetQuery: state.searchFormState.datasetQuery,
    serverInfo: state.dataState.info,
    advancedSearchDialogOpen: state.dashboardState.advancedSearchDialogOpen,
    saveSearchDialogOpen: state.dashboardState.saveSearchDialogOpen,
    helpDialogOpen: state.dashboardState.helpDialogOpen,
    productGroupsHelpDialogOpen:
      state.dashboardState.productGroupsHelpDialogOpen,
    loading: state.searchFormState.loading,

    //searchHistory: state.searchFormState.searchHistory,
    saveSearchTitle: state.searchFormState.saveSearchTitle,

    // Advanced Find
    selectedWavelength: state.searchFormState.datasetQuery.wavelengthsMode,
    selectedWaterDepth: state.searchFormState.datasetQuery.wdepth,
    selectedOptShallow: state.searchFormState.datasetQuery.shallow,
    selectedProducts: state.searchFormState.datasetQuery.productNames,

    // SearchMap

    position: state.searchMapState.position,
    zoom: state.searchMapState.zoom,
    testMarkerCluster: true,
    foundDatasets: state.searchFormState.foundDatasets,
    selectedDatasets: state.dataTableState.selectedDatasets,
    selectedBounds: state.searchMapState.selectedBounds,

    drawBounds: state.searchMapState.drawBounds,
    selectedManualBBox: state.searchMapState.selectedManualBounds,
    manualBBoxInputOpen: state.searchMapState.manualBBoxInputOpen,
    selectedBBoxSouth: state.searchMapState.selectedBBoxSouth,
    selectedBBoxWest: state.searchMapState.selectedBBoxWest,
    selectedBBoxNorth: state.searchMapState.selectedBBoxNorth,
    selectedBBoxEast: state.searchMapState.selectedBBoxEast,

    // DataTable

    page: state.dataTableState.page,
    rowsPerPage: state.dataTableState.rowsPerPage,

    metaInfoDialogOpen: state.dataTableState.metaInfoDialogOpen,
    helpMetaInfoDialogOpen: state.dashboardState.helpMetaInfoDialogOpen,
    helpMetaInfoKey: state.dashboardState.helpMetaInfoKey,
    plotDialogOpen: state.dataTableState.plotDialogOpen,
    termsDialogOpen: state.dataTableState.termsDialogOpen,
    termsSingleDialogOpen: state.dataTableState.termsSingleDialogOpen,
    termsDownloadDialogOpen: state.dataTableState.termsDownloadDialogOpen,

    data: state.searchFormState.foundDatasets,
    dataset: state.dataTableState.dataset,
    downloadDocs: state.dataTableState.downloadDocs,

    apiServerUrl: state.configState.apiServerUrl,

    downloading: state.dataTableState.downloading,

    plotState: state.dataTableState.plotState,
    plotData: state.dataTableState.plotData,
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

  openProductGroupsHelpDialog,
  closeProductGroupsHelpDialog,

  startLoading,

  updateSearchHistory,
  updateSaveSearchTitle,

  // Advanced Search
  updateWavelength,
  updateWaterDepth,
  updateOptShallow,
  updateProducts,

  updateSelectedRegions,

  // SearchMap

  updateSelectedDatasets,

  openManualBBoxDialog,
  closeManualBBoxDialog,
  updateManualBBox,
  updateManualBBoxSouth,
  updateManualBBoxWest,
  updateManualBBoxNorth,
  updateManualBBoxEast,

  // Data Table

  updateDataPage,
  updateDataRowsPerPage,
  closeMetaInfoDialog,
  openMetaInfoDialog,
  openHelpMetaInfoDialog,
  closeHelpMetaInfoDialog,
  openPlotDialog,
  closePlotDialog,
  openTermsDialog,
  closeTermsDialog,
  openTermsDirectDialog,
  closeTermsDirectDialog,
  openTermsSingleDialog,
  closeTermsSingleDialog,
  updateDataset,
  updateDownloadDocs,
  downloadDatasets,
  downloadDataset,
  startDownloading,
  updatePlotState,
  updatePlotData,
  directDownloadDataset
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
