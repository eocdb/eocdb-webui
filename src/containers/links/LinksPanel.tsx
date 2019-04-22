import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import LinksPanel from "../../components/links/LinksPanel";


const mapStateToProps = (state: AppState) => {
    return {
        content: state.linksPageState.content,
    };
};


const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(LinksPanel)

