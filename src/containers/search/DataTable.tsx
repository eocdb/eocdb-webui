import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import {
    closeMetaInfoDialog,
    openMetaInfoDialog,
    closePlotDialog,
    openPlotDialog,
    downloadDatasets,
    startDownloading,
    updateDataPage,
    updateDataRowsPerPage,
    updateDataset,
    updateDownloadDocs,
    updateSelectedDatasets,
    updatePlotState,
} from '../../actions/dataTableActions';

import DataTable from '../../components/search/DataTable';
import { searchDatasets, startLoading } from "../../actions/searchFormActions";

const mapStateToProps = (state: AppState) => {
    return {
        page: state.dataTableState.page,
        rowsPerPage: state.dataTableState.rowsPerPage,

        metaInfoDialogOpen: state.dataTableState.metaInfoDialogOpen,
        plotDialogOpen: state.dataTableState.plotDialogOpen,

        data: state.searchFormState.foundDatasets,
        dataset: state.dataTableState.dataset,
        downloadDocs: state.dataTableState.downloadDocs,

        selectedDatasets: state.dataTableState.selectedDatasets,

        apiServerUrl: state.configState.apiServerUrl,

        downloading: state.dataTableState.downloading,

        plotState: state.dataTableState.plotState,
    };
};

const mapDispatchToProps = {
    updateDataPage,
    updateDataRowsPerPage,
    closeMetaInfoDialog,
    openMetaInfoDialog,
    openPlotDialog,
    closePlotDialog,
    updateDataset,
    searchDatasets,
    updateDownloadDocs,
    updateSelectedDatasets,
    downloadDatasets,
    startLoading,
    startDownloading,
    updatePlotState,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
