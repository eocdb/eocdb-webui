import PanelHome from "./PanelHome";
import * as React from "react";
import PanelSearch from "../containers/PanelSearch";


interface DashPanelsProps {
    currentDrawer: string
    classes: any;
}

class DashPanels extends React.PureComponent<DashPanelsProps> {
    constructor(props: DashPanelsProps) {
        super(props);
    }

    render() {
        let panel;
        if (this.props.currentDrawer == 'Search') {
            panel = <PanelSearch classes={this.props.classes}/>;
        } else {
            panel = <PanelHome classes={this.props.classes}/>;
        }
        return (
            <div>
                {panel}
            </div>
        );
    }
}

export default DashPanels;