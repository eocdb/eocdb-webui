import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import {closeLinksContentDialog, openLinksContentDialog, updateLinksContent} from "../../actions/adminActions";
import AdminPanel from "../../components/admin/AdminPanel";

const mapStateToProps = (state: AppState) => {
    return {
        linksContentDialogOpen: state.linksPageState.editContentDialogOpen
    };
};


const mapDispatchToProps = {
    openLinksContentDialog,
    closeLinksContentDialog,
    updateLinksContent,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)

