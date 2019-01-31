import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import AdvancedSearchLog from "../../components/search/AdvancedSearchLog";
import { leftChange, rightChange } from "../../actions/advancedSearchActions";


const mapStateToProps = (state: AppState) => {
    return {
        left: state.advancedSearchState.left,
        right: state.advancedSearchState.right,
    };
};

const mapDispatchToProps = {
    leftChange,
    rightChange,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchLog);