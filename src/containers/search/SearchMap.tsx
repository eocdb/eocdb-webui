import { connect } from 'react-redux';
import { AppState } from '../../states/appState';

import {
    closeManualBBoxDialog,
    openManualBBoxDialog,
    updateManualBBox, updateManualBBoxEast, updateManualBBoxNorth, updateManualBBoxSouth, updateManualBBoxWest,
    updateSelectedRegions
} from '../../actions/searchMapActions';
import SearchMap from '../../components/search/SearchMap';
import { updateSelectedDatasets } from "../../actions/dataTableActions";

const mapStateToProps = (state: AppState) => {
    return {
        position: state.searchMapState.position,
        zoom: state.searchMapState.zoom,
        testMarkerCluster: true,
        foundDatasets: state.searchFormState.foundDatasets,
        selectedDatasets: state.dataTableState.selectedDatasets,
        selectedBounds: state.searchMapState.selectedBounds,

        drawBounds: state.searchMapState.drawBounds,
        selectedManualBBox: state.searchMapState.selectedManualBounds,
        manualBBoxInputOpen: state.searchMapState.manualBBoxInputOpen,
        selectedBBoxSouth: state.searchMapState.selectedBBoxSouth,
        selectedBBoxWest: state.searchMapState.selectedBBoxWest,
        selectedBBoxNorth: state.searchMapState.selectedBBoxNorth,
        selectedBBoxEast: state.searchMapState.selectedBBoxEast,
    }
};

const mapDispatchToProps = {
    updateSelectedRegions,
    updateSelectedDatasets,

    openManualBBoxDialog,
    closeManualBBoxDialog,
    updateManualBBox,
    updateManualBBoxSouth,
    updateManualBBoxWest,
    updateManualBBoxNorth,
    updateManualBBoxEast,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMap);
