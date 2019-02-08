import { connect } from 'react-redux';
import { AppState } from '../states/appState';

import {
    changeDrawer,
    openLoginDialog,
    openConfigDialog,
    closeConfigDialog,
    closeLoginDialog,
    openRegistrationDialog
} from '../actions/dashboardActions';
import { configServer } from '../actions/configActions'
import Dashboard from '../components/Dashboard';
import { loginUser } from '../actions/userActions';
import { updateSubmissionsForUser } from "../actions/submissionActions";

const mapStateToProps = (state: AppState) => {
    return {
        currentDrawer: state.dashboardState.currentDrawer,
        loginDialogOpen: state.dashboardState.loginDialogOpen,
        configDialogOpen: state.dashboardState.configDialogOpen,
        apiServerUrl: state.configState.apiServerUrl,
        user: state.sessionState.user,
    }
};

const mapDispatchToProps = {
    changeDrawer,
    openLoginDialog,
    closeLoginDialog,

    openConfigDialog,
    closeConfigDialog,

    loginUser,
    openRegistrationDialog,

    updateSubmissions: updateSubmissionsForUser,

    apiServerUrlChange: configServer, // TODO: rename apiServerUrlChange --> configServer
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
