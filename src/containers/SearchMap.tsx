import { connect } from 'react-redux';
import { AppState } from '../types/appState';

import { updateGeometry } from '../actions/searchMap';
import SearchMap from '../components/SearchMap';

const mapStateToProps = (state: AppState) => {
    return {
        position: state.searchMapState.position,
        zoom: state.searchMapState.zoom,
    }
};

const mapDispatchToProps = {
    updateGeometry,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMap);
