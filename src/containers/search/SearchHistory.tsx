import { connect } from 'react-redux';

import { AppState } from '../../states/appState';
import SearchHistory from '../../components/search/SearchHistory';

const mapStateToProps = (state: AppState) => {
    return {
        searchHistory: state.searchFormState.searchHistory,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
