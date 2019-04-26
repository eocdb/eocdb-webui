import {connect} from 'react-redux';
import {AppState} from '../states/appState';

import {
    changeDrawer,
    openLoginDialog,
    openConfigDialog,
    closeConfigDialog,
    closeLoginDialog,
    openRegistrationDialog
} from '../actions/dashboardActions';
import {configServer} from '../actions/configActions'
import Dashboard from '../components/Dashboard';
import {loginUser} from '../actions/userActions';
import {getSubmissionsForUser} from "../actions/submissionActions";
import { searchDatasets, updateDatasetQuery, updateSearchHistory } from "../actions/findActions";

const mapStateToProps = (state: AppState) => {
    return {
        currentDrawer: state.dashboardState.currentDrawer,
        loginDialogOpen: state.dashboardState.loginDialogOpen,
        configDialogOpen: state.dashboardState.configDialogOpen,
        apiServerUrl: state.configState.apiServerUrl,
        user: state.sessionState.user,

        searchHistory: state.searchFormState.searchHistory,

        loginDialogProps: {
            open: state.dashboardState.loginDialogOpen,
            userName: state.sessionState.user ? state.sessionState.user.name : '',
            userLoginError: state.sessionState.userLoginError,
            userLoginInProgress: state.sessionState.userLoginInProgress,
        }
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

    updateSubmissions: getSubmissionsForUser,
    updateDatasetQuery,
    updateSearchHistory,
    searchDatasets,

    apiServerUrlChange: configServer, // TODO: rename apiServerUrlChange --> configServer

    loginDialogProps: {
        loginUser,
        closeLoginDialog,
        openRegistrationDialog,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
