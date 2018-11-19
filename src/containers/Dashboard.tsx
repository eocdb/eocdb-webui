import { connect } from 'react-redux';
import { AppState } from '../types/appState';

import { changeDrawer, openUserDialog, openConfigDialog } from '../actions/dashboardActions';
import Dashboard from '../components/Dashboard';

const mapStateToProps = (state: AppState) => {
    return {
        currentDrawer: state.dashboardState.currentDrawer,
        dlgUserOpen: state.dashboardState.dlgUserOpen,
        dlgConfigOpen: state.dashboardState.dlgConfigOpen,
    }
};

const mapDispatchToProps = {
    changeDrawer,
    toggleUserDlg: openUserDialog,
    toggleConfigDlg: openConfigDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
