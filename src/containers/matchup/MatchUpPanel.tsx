import { connect } from "react-redux";

import { AppState } from "../../states/appState";

import MatchUpPanel from "../../components/matchup/MatchupPanel";


const mapStateToProps = (state: AppState) => {
    return {
        matchupFiles: state.configState.matchupFiles,
    };
};


const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(MatchUpPanel)

