import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import SubmitSteps from "../../components/submit/Submission";
import {
    clearForm,
    submitFiles,
    updateDataFiles,
    updateDocFiles,
    updatePath,
    updateSubmissionId
} from "../../actions/submitActions";


const mapStateToProps = (state: AppState) => {
    return {
        submissionId: state.submitState.submissionId,
        path: state.submitState.path,
        dataFiles: state.submitState.dataFiles,
        docFiles: state.submitState.docFiles,
    };
};


const mapDispatchToProps = {
    onSubmissionIdChange: updateSubmissionId,
    onPathChange: updatePath,
    onDatafilesChange: updateDataFiles,
    onDocfilesChange: updateDocFiles,
    onFileSubmit: submitFiles,
    //onError: postMessage,
    onClearForm: clearForm,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmitSteps)

