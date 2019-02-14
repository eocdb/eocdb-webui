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
        waterDepthMin: state.advancedSearchState.waterDepthMin,
        waterDepthMax: state.advancedSearchState.waterDepthMax,
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