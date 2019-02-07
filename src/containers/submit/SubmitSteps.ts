import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import SubmitSteps from "../../components/submit/SubmitSteps";
import {submitFiles, updateDataFiles, updateDocFiles, updateSubmissionId} from "../../actions/submitActions";


const mapStateToProps = (state: AppState) => {
    return {
        submissionId: state.submitState.submissionId,
        dataFiles: state.submitState.dataFiles,
        docFiles: state.submitState.docFiles,
    };
};


const mapDispatchToProps = {
    onSubmissionIdChange: updateSubmissionId,
    onDatafilesChange: updateDataFiles,
    onDocfilesChange: updateDocFiles,
    onFileSubmit: submitFiles,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmitSteps)

