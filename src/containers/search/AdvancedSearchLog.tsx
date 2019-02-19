import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import AdvancedSearchLog from "../../components/search/AdvancedSearchLog";
import {
    updateBBox,
    updateWavelength,
    updateWaterDepth,
    updateOptShallow,
    updateProducts
} from "../../actions/advancedSearchActions";


const mapStateToProps = (state: AppState) => {
    return {
        selectedBBox: state.advancedSearchState.selectedBBox,
        selectedWavelength: state.advancedSearchState.selectedWavelength,
        waterDepth: state.advancedSearchState.waterDepth,
        selectedOptShallow: state.advancedSearchState.selectedOptShallow,
        selectedProducts: state.advancedSearchState.selectedProducts,
    };
};

const mapDispatchToProps = {
    updateBBox,
    updateWavelength,
    updateWaterDepth,
    updateOptShallow,
    updateProducts,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchLog);