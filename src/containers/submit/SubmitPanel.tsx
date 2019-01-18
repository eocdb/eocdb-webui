import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import { closeSubmitSteps, openSubmitSteps } from "../../actions/submitActions";
import SubmitPanel from "../../components/submit/SubmitPanel";


const mapStateToProps = (state: AppState) => {
    return {
        submitStepsOpen: state.submitState.submitStepsOpen,
    };
};


const mapDispatchToProps = {
    closeSubmitSteps,
    openSubmitSteps,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmitPanel)

