import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import {
    closeLinksContentDialog,
    openLinksContentDialog,
    saveLinksContent,
    updateLinksContent
} from "../../actions/adminActions";
import AdminPanel from "../../components/admin/AdminPanel";

const mapStateToProps = (state: AppState) => {
    return {
        linksContentDialogOpen: state.linksPageState.editContentDialogOpen,
        linksContent: state.linksPageState.content,
    };
};


const mapDispatchToProps = {
    openLinksContentDialog,
    closeLinksContentDialog,
    updateLinksContent,
    saveLinksContent,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)

