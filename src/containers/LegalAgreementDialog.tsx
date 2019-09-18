import { connect } from 'react-redux';

import { AppState } from '../states/appState';

import LegalAgreementDialog from "../components/messages/LegalAgreementDialog";
import { updateSession } from "../actions/userActions";

const mapStateToProps = (state: AppState) => {
    return {
        open: !state.sessionState.legalAgreementAccepted,
        settings: state.sessionState,
    };
};

const mapDispatchToProps = {
    updateSettings: updateSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalAgreementDialog);