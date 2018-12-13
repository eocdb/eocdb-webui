import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import {
    closeMetaInfoDialog, closePlotDialog,
    openMetaInfoDialog, openPlotDialog,
    updateDataPage,
    updateDataRowsPerPage,
    updateDataset,
} from '../../actions/dataTableActions';
import DataTable from '../../components/search/DataTable';
import { searchDatasets } from "../../actions/searchFormActions";

const mapStateToProps = (state: AppState) => {
    return {
        page: state.dataTableState.page,
        rowsPerPage: state.dataTableState.rowsPerPage,

        metaInfoDialogOpen: state.dataTableState.metaInfoDialogOpen,
        plotDialogOpen: state.dataTableState.plotDialogOpen,

        data: state.searchFormState.foundDatasets,
        dataset: state.dataTableState.dataset,
    };
};

const mapDispatchToProps = {
    updateDataPage,
    updateDataRowsPerPage,
    closeMetaInfoDialog,
    openMetaInfoDialog,
    closePlotDialog,
    openPlotDialog,
    updateDataset,
    searchDatasets,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
