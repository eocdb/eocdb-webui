import { connect } from 'react-redux';
import { AppState } from '../../states/appState';

import { updateSelectedRegions } from '../../actions/searchMapActions';
import SearchMap from '../../components/search/SearchMap';

const mapStateToProps = (state: AppState) => {
    return {
        position: state.searchMapState.position,
        zoom: state.searchMapState.zoom,
    }
};

const mapDispatchToProps = {
    updateSelectedRegions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMap);
