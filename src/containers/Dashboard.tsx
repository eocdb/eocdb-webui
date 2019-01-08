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
import { configureApiServer } from '../actions/configActions'
import Dashboard from '../components/Dashboard';
import { loginUser } from '../actions/userActions';

const mapStateToProps = (state: AppState) => {
    return {
        currentDrawer: state.dashboardState.currentDrawer,
        loginDialogOpen: state.dashboardState.loginDialogOpen,
        configDialogOpen: state.dashboardState.configDialogOpen,
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

    configureApiServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
