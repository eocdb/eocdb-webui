import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import {
    closeMetaInfoDialog,
    openMetaInfoDialog,
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

        data: state.searchFormState.foundDatasets,
        dataset: state.dataTableState.dataset,
    };
};

const mapDispatchToProps = {
    updateDataPage,
    updateDataRowsPerPage,
    closeMetaInfoDialog,
    openMetaInfoDialog,
    updateDataset,
    searchDatasets,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
