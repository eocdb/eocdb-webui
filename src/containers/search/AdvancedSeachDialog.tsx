import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import AdvancedSearchDialog from "../../components/search/AdvancedSearchDialog";
import { bottomChange, leftChange, rightChange, topChange } from "../../actions/advancedSearchActions";


const mapStateToProps = (state: AppState) => {
    return {
        left: state.advancedSearchState.left,
        bottom: state.advancedSearchState.bottom,
        right: state.advancedSearchState.right,
        top: state.advancedSearchState.top,
        filterLog: state.advancedSearchState.filterLog,
    };
};

const mapDispatchToProps = {
    leftChange,
    bottomChange,
    rightChange,
    topChange,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchDialog);