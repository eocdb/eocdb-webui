import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import {
    closeMetaInfoDialog,
    openMetaInfoDialog,
    updateDataPage,
    updateDataRowsPerPage
} from '../../actions/dataTableActions';
import DataTable from '../../components/search/DataTable';

const mapStateToProps = (state: AppState) => {
    return {
        page: state.dataTableState.page,
        rowsPerPage: state.dataTableState.rowsPerPage,

        metaInfoDialogOpen: state.dataTableState.metaInfoDialogOpen,

        data: state.searchFormState.foundDatasets,
    };
};

const mapDispatchToProps = {
    updateDataPage,
    updateDataRowsPerPage,
    closeMetaInfoDialog,
    openMetaInfoDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
