import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import AdvancedSearchDialog from "../../components/search/AdvancedSearchDialog";
import {
    updateBBox,
    updateWavelength,
    updateWaterDepth,
    updateOptShallow, updateProducts, updateProductValue,
}
    from "../../actions/advancedSearchActions";

const mapStateToProps = (state: AppState) => {
    return {
        selectedBBox: state.advancedSearchState.selectedBBox,
        selectedWavelength: state.advancedSearchState.selectedWavelength,
        waterDepth: state.advancedSearchState.waterDepth,
        selectedOptShallow: state.advancedSearchState.selectedOptShallow,
        selectedProducts: state.advancedSearchState.selectedProducts,
        productInputValue: state.advancedSearchState.productInputValue,
    };
};


const mapDispatchToProps = {
    updateBBox,
    updateWavelength,
    updateWaterDepth,
    updateOptShallow,
    updateProducts,
    updateProductValue,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchDialog);