import PanelHome from "./panels/PanelHome";
import * as React from "react";
import PanelSearch from "../containers/PanelSearch";
import PanelSubmit from "./panels/PanelSubmit";
import PanelBrowse from "./panels/PanelBrowse";
import PanelAdmin from "./panels/PanelAdmin";


interface DashPanelsProps {
    currentDrawer: string
    classes: any;
}

class DashPanels extends React.PureComponent<DashPanelsProps> {
    constructor(props: DashPanelsProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <PanelSearch show={this.props.currentDrawer=='Search'} classes={this.props.classes}/>
                <PanelHome show={this.props.currentDrawer=='Home'} classes={this.props.classes}/>
                <PanelSubmit show={this.props.currentDrawer=='Submit'} classes={this.props.classes}/>
                <PanelBrowse show={this.props.currentDrawer=='Browse'} classes={this.props.classes}/>
                <PanelAdmin show={this.props.currentDrawer=='Admin'} classes={this.props.classes}/>
            </div>
        );
    }
}

export default DashPanels;