import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import SubmissionTable from "../../components/submit/SubmissionTable";
import {
    openSubmissionFilesDialog,
    closeSubmissionFilesDialog,
} from "../../actions/submissionActions";

const mapStateToProps = (state: AppState) => {
    return {
        submissions: state.submitState.foundSubmissions,
        user: state.sessionState.user,
        submissionFilesDialogOpen: state.submitState.submissionFilesDialogOpen,
    };
};


const mapDispatchToProps = {
    openSubmissionFilesDialog,
    closeSubmissionFilesDialog,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionTable)

