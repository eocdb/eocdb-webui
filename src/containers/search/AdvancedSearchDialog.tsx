import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import AdvancedSearchDialog from "../../components/search/AdvancedSearchDialog";
import {
    updateBBox,
    updateWavelength,
    updateWaterDepth,
    updateOptShallow,
}
    from "../../actions/advancedSearchActions";

const mapStateToProps = (state: AppState) => {
    return {
        selectedBounds: state.advancedSearchState.selectedBounds,
        selectedWavelength: state.advancedSearchState.selectedWavelength,
        waterDepth: state.advancedSearchState.waterDepth,
        selectedOptShallow: state.advancedSearchState.selectedOptShallow,
    };
};


const mapDispatchToProps = {
    updateBBox,
    updateWavelength,
    updateWaterDepth,
    updateOptShallow,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchDialog);