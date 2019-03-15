import { connect } from 'react-redux';
import { AppState } from '../../states/appState';

import { updateSelectedRegions } from '../../actions/searchMapActions';
import SearchMap from '../../components/search/SearchMap';
import { updateSelectedDatasets } from "../../actions/dataTableActions";

const mapStateToProps = (state: AppState) => {
    return {
        position: state.searchMapState.position,
        zoom: state.searchMapState.zoom,
        testMarkerCluster: true,
        foundDatasets: state.searchFormState.foundDatasets,
        selectedDatasets: state.dataTableState.selectedDatasets,
        selectedBounds: state.dataTableState.selectedBounds,
        selectedRectangleFromAdvancedDialog: state.advancedSearchState.selectedBBox,
    }
};

const mapDispatchToProps = {
    updateSelectedRegions,
    updateSelectedDatasets,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMap);
