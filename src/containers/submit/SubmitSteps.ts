import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import { setActiveStepDown, setActiveStepUp } from "../../actions/submitActions";
import SubmitSteps from "../../components/submit/SubmitSteps";


const mapStateToProps = (state: AppState) => {
    return {
        activeStep: state.submitState.activeStep,
    };
};


const mapDispatchToProps = {
    setActiveStepUp,
    setActiveStepDown,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmitSteps)

