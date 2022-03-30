import { connect } from "react-redux";

import { AppState } from "../../states/appState";

import MatchupPanel from "../../components/matchup/MatchupPanel";
import {
    closeMessageDialog,
    closeTermsDialog,
    openMessageDialog,
    openTermsDialog,
    updateSelectedRowData
} from "../../actions/matchupActions";


const mapStateToProps = (state: AppState) => {
    return {
        matchupFiles: state.configState.matchupFiles,
        termsDialogOpen: state.matchupState.termsDialogOpen,
        messageDialogOpen: state.matchupState.messageDialogOpen,
        selectedRowData: state.matchupState.selectedRowData,
    };
};


const mapDispatchToProps = {
    openTermsDialog,
    closeTermsDialog,
    openMessageDialog,
    closeMessageDialog,
    updateSelectedRowData,
};


export default connect(mapStateToProps, mapDispatchToProps)(MatchupPanel)

