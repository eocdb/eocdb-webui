import {connect} from 'react-redux';
import {AppState} from '../states/appState';

import {
    changeDrawer,
    openLoginDialog,
    openConfigDialog,
    closeConfigDialog,
    closeLoginDialog,
    openUserRegistrationDialog,
    closeUserRegistrationDialog, openChangeUserLoginDialog, closeChangeUserLoginDialog
} from '../actions/dashboardActions';
import { configServer, getMatchupFiles } from '../actions/configActions'
import Dashboard from '../components/Dashboard';
import { changeLoginUser, loginUser, logoutUser } from '../actions/userActions';
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

        open: state.dashboardState.loginDialogOpen,
        userName: state.sessionState.user ? state.sessionState.user.name : '',
        userLoginError: state.sessionState.userLoginError,
        userLoginInProgress: state.sessionState.userLoginInProgress,

        userRegistrationDialogOpen: state.dashboardState.userRegistrationDialogOpen,
        changeUserLoginDialogOpen: state.dashboardState.changeUserLoginDialogOpen,
    }
};

const mapDispatchToProps = {
    changeDrawer,
    openLoginDialog,
    closeLoginDialog,

    openConfigDialog,
    closeConfigDialog,

    loginUser,
    logoutUser,

    updateSubmissions: getSubmissionsForUser,
    getMatchupFiles: getMatchupFiles,
    updateDatasetQuery,
    updateSearchHistory,
    searchDatasets,

    openUserRegistrationDialog,
    closeUserRegistrationDialog,

    openChangeUserLoginDialog,
    closeChangeUserLoginDialog,
    changeLoginUser,

    apiServerUrlChange: configServer, // TODO: rename apiServerUrlChange --> configServer
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
