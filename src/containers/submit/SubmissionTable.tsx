import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import SubmissionTable from "../../components/submit/SubmissionTable";


const mapStateToProps = (state: AppState) => {
    return {
        submissions: state.submitState.foundSubmissions
    };
};


const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionTable)

