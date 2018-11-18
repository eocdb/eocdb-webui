import { connect } from 'react-redux';
import { AppState } from '../types/appState';

import { updateSelectedRegions } from '../actions/searchMapActions';
import SearchMap from '../components/SearchMap';

const mapStateToProps = (state: AppState) => {
    return {
        position: state.searchMapState.position,
        zoom: state.searchMapState.zoom,
    }
};

const mapDispatchToProps = {
    updateGeometry: updateSelectedRegions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMap);
