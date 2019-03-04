import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import {
    clearSubmissionForm,
    closeSubmitSteps,
    openSubmitSteps,
    sendSubmission,
    updateDataFiles,
    updateDocFiles,
    updatePath,
    updateSubmissionId,
    updateSubmissionsForUser
} from "../../actions/submissionActions";
import SubmissionPanel from "../../components/submit/SubmissionPanel";


const mapStateToProps = (state: AppState) => {
    return {
        submissionOpen: state.submitState.submissionOpen,

        selectedSubmissionId: state.submitState.submissionId,
        selectedPath: state.submitState.path,
        selectedDataFiles: state.submitState.dataFiles,
        selectedDocFiles: state.submitState.docFiles,
    };
};


const mapDispatchToProps = {
    updateSubmissionId,
    updatePath,
    updateDataFiles,
    updateDocFiles,

    updateSubmissionsForUser,
    sendSubmission,
    clearSubmissionForm,

    closeSubmission: closeSubmitSteps,
    openSubmission: openSubmitSteps,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPanel)

