import {AppState} from "../../states/appState";
import {connect} from "react-redux";
import {
    openSubmissionIssuesDialog,
    closeSubmissionIssuesDialog,
} from "../../actions/submissionActions";

import SubmissionFilesDialog from "../../components/submit/SubmissionFilesDialog";

const mapStateToProps = (state: AppState) => {
    return {
        submissionIssuesDialogOpen: state.submitState.submissionIssuesDialogOpen,
    };
};


const mapDispatchToProps = {
    closeSubmissionIssuesDialog,
    openSubmissionIssuesDialog,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionFilesDialog)