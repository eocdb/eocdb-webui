import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import { loginUser } from '../../actions/userActions';
import { closeLoginDialog, openRegistrationDialog } from '../../actions/dashboardActions';
import LoginDialog from '../../components/user/LoginDialog';

const mapStateToProps = (state: AppState) => {
    return {
        open: state.dashboardState.loginDialogOpen,
        // TODO: check: better to store last userName in state.sessionState (because it may be either name or email))?
        userName: state.sessionState.user ? state.sessionState.user.name : '',
        userLoginError: state.sessionState.userLoginError,
        userLoginInProgress: state.sessionState.userLoginInProgress,
    };
};

const mapDispatchToProps = {
    loginUser,
    closeLoginDialog,
    openRegistrationDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
