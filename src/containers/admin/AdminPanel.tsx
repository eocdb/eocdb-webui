import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import {
    closeLinksContentDialog,
    openLinksContentDialog,
    saveLinksContent,
    updateLinksContent
} from "../../actions/adminActions";
import AdminPanel from "../../components/admin/AdminPanel";
import { closeConfigDialog, openConfigDialog } from "../../actions/dashboardActions";
import { configServer } from "../../actions/configActions";

const mapStateToProps = (state: AppState) => {
    return {
        linksContentDialogOpen: state.linksPageState.editContentDialogOpen,
        linksContent: state.linksPageState.content,
        apiServerUrl: state.configState.apiServerUrl,
        configDialogOpen: state.dashboardState.configDialogOpen,
    };
};


const mapDispatchToProps = {
    openLinksContentDialog,
    closeLinksContentDialog,
    updateLinksContent,
    saveLinksContent,
    openConfigDialog,
    closeConfigDialog,
    configServer,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)

