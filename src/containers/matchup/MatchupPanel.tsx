import { connect } from "react-redux";

import { AppState } from "../../states/appState";

import MatchupPanel from "../../components/matchup/MatchupPanel";
import { closeTermsDialog, openTermsDialog, updateSelectedRowData } from "../../actions/matchupActions";


const mapStateToProps = (state: AppState) => {
    return {
        matchupFiles: state.configState.matchupFiles,
        termsDialogOpen: state.matchupState.termsDialogOpen,
        selectedRowData: state.matchupState.selectedRowData,
    };
};


const mapDispatchToProps = {
    openTermsDialog,
    closeTermsDialog,
    updateSelectedRowData,
};


export default connect(mapStateToProps, mapDispatchToProps)(MatchupPanel)

