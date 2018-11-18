import { connect } from 'react-redux';
import { AppState } from '../types/appState';

import SearchMap from '../components/SearchMap';

const mapStateToProps = (state: AppState) => ({
    position: state.searchMapState.position,
    zoom: state.searchMapState.zoom,
});

export default connect(mapStateToProps)(SearchMap);