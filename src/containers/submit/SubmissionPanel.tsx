import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import { closeSubmitSteps, openSubmitSteps } from "../../actions/submissionActions";
import SubmissionPanel from "../../components/submit/SubmissionPanel";


const mapStateToProps = (state: AppState) => {
    return {
        submissionOpen: state.submitState.submissionOpen,
    };
};


const mapDispatchToProps = {
    closeSubmission: closeSubmitSteps,
    openSubmission: openSubmitSteps,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPanel)

