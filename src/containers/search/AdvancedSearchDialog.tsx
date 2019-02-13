import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import AdvancedSearchDialog from "../../components/search/AdvancedSearchDialog";
import {
    bboxChange,
    updateSelectedWavelength, updateWaterDepth
}
    from "../../actions/advancedSearchActions";


const mapStateToProps = (state: AppState) => {
    return {
        selectedBounds: state.advancedSearchState.selectedBounds,
        selectedWavelength: state.advancedSearchState.selectedWavelength,
        waterDepthMin: state.advancedSearchState.waterDepthMin,
        waterDepthMax: state.advancedSearchState.waterDepthMax,
    };
};


const mapDispatchToProps = {
    onBBoxChange: bboxChange,
    onWavelengthSelect: updateSelectedWavelength,
    updateWaterDepth
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchDialog);