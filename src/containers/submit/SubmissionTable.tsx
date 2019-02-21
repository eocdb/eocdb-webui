import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import SubmissionTable from "../../components/submit/SubmissionTable";
import {
    openSubmissionFilesDialog,
    closeSubmissionFilesDialog,
    updateCurrentSubmission, setSubmissionStatus,
} from "../../actions/submissionActions";

const mapStateToProps = (state: AppState) => {
    return {
        submissions: state.submitState.foundSubmissions,
        user: state.sessionState.user,
        submissionFilesDialogOpen: state.submitState.submissionFilesDialogOpen,
        currentSubmissionId: state.submitState.currentSubmissionId,
        currentSubmissionFiles: state.submitState.currentSubmissionFiles,
    };
};


const mapDispatchToProps = {
    openSubmissionFilesDialog,
    closeSubmissionFilesDialog,
    updateCurrentSubmission,
    approveSubmission: setSubmissionStatus,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionTable)

