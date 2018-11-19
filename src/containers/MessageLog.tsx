import { connect } from 'react-redux';
import { AppState } from '../states/appState';

import { hideMessage } from '../actions/messageLogActions';
import { MessageLog } from '../components/MessageLog';

const mapStateToProps = (state: AppState) => {
    return {
        messages: state.messageLogState.newEntries,
    }
};

const mapDispatchToProps = {
    hideMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageLog);
