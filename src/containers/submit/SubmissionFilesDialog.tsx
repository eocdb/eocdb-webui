import {AppState} from "../../states/appState";
import {connect} from "react-redux";
import {
    openSubmissionIssuesDialog,
    closeSubmissionIssuesDialog,
    updateCurrentSubmissionFile,
    updateCurrentSubmissionFileIndex,
} from "../../actions/submissionActions";

import SubmissionFilesDialog from "../../components/submit/SubmissionFilesDialog";

const mapStateToProps = (state: AppState) => {
    return {
        submissionIssuesDialogOpen: state.submitState.submissionIssuesDialogOpen,
        currentSubmissionFile: state.submitState.currentSubmissionFile,
        currentSubmissionFileIndex: state.submitState.currentSubmissionFileIndex,
    };
};


const mapDispatchToProps = {
    closeSubmissionIssuesDialog,
    openSubmissionIssuesDialog,
    updateCurrentSubmissionFile,
    updateCurrentSubmissionFileIndex,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionFilesDialog)