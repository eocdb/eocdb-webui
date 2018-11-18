import { connect } from 'react-redux';
import { AppState } from '../types/appState';

import { changeDrawer } from '../actions/dashboardAction';
import Dashboard from '../components/Dashboard';

const mapStateToProps = (state: AppState) => {
    return {
        currentDrawer: state.dashboardState.currentDrawer,
    }
};

const mapDispatchToProps = {
    changeDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
