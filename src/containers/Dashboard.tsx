import { connect } from 'react-redux';
import { AppState } from '../states/appState';

import {
    changeDrawer,
    openUserDialog,
    openConfigDialog,
    closeConfigDialog,
    closeUserDialog
} from '../actions/dashboardActions';

import Dashboard from '../components/Dashboard';
import { configServer } from "../actions/configActions";

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
    openUserDialog: openUserDialog,
    closeUserDialog: closeUserDialog,

    openConfigDialog: openConfigDialog,
    closeConfigDialog: closeConfigDialog,

    apiServerUrlChange: configServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
