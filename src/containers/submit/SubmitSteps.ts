import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import SubmitSteps from "../../components/submit/SubmitSteps";
import { updateDataFiles, updateDocFiles } from "../../actions/submitActions";


const mapStateToProps = (state: AppState) => {
    return {
        dataFiles: state.submitState.dataFiles,
        docFiles: state.submitState.docFiles,
    };
};


const mapDispatchToProps = {
    onDatafilesChange: updateDataFiles,
    onDocfilesChange: updateDocFiles,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmitSteps)

