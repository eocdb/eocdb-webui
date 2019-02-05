import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import {
    closeMetaInfoDialog, downloadDatasets,
    openMetaInfoDialog, startDownloading,
    updateDataPage,
    updateDataRowsPerPage,
    updateDataset,
    updateDownloadDocs,
    updateSelectedDatasets,
} from '../../actions/dataTableActions';
import DataTable from '../../components/search/DataTable';
import { searchDatasets, startLoading } from "../../actions/searchFormActions";

const mapStateToProps = (state: AppState) => {
    return {
        page: state.dataTableState.page,
        rowsPerPage: state.dataTableState.rowsPerPage,

        metaInfoDialogOpen: state.dataTableState.metaInfoDialogOpen,

        data: state.searchFormState.foundDatasets,
        dataset: state.dataTableState.dataset,
        downloadDocs: state.dataTableState.downloadDocs,

        selectedDatasets: state.dataTableState.selectedDatasets,

        apiServerUrl: state.configState.apiServerUrl,

        downloading: state.dataTableState.downloading,
    };
};

const mapDispatchToProps = {
    updateDataPage,
    updateDataRowsPerPage,
    closeMetaInfoDialog,
    openMetaInfoDialog,
    updateDataset,
    searchDatasets,
    updateDownloadDocs,
    updateSelectedDatasets,
    downloadDatasets,
    startLoading,
    startDownloading,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
