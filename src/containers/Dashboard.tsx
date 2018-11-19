import { connect } from 'react-redux';
import { AppState } from '../types/appState';

import { changeDrawer, openUserDialog, openConfigDialog } from '../actions/dashboardActions';
import { configServer } from '../actions/configActions'
import Dashboard from '../components/Dashboard';

const mapStateToProps = (state: AppState) => {
    return {
        currentDrawer: state.dashboardState.currentDrawer,
        dlgUserOpen: state.dashboardState.dlgUserOpen,
        dlgConfigOpen: state.dashboardState.dlgConfigOpen,
        apiServerUrl: state.configState.apiServerUrl,
    }
};

const mapDispatchToProps = {
    changeDrawer,
    toggleUserDlg: openUserDialog,
    toggleConfigDlg: openConfigDialog,

    apiServerUrlChange: configServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
