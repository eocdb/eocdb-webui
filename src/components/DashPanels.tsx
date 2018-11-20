import * as React from 'react';

import HomePanel from './home/HomePanel';
import SubmitPanel from './submit/SubmitPanel';
import BrowsePanel from './browse/BrowsePanel';
import AdminPanel from './admin/AdminPanel';
import PanelSearch from '../containers/search/SearchPanel'; // TODO: dependency issue here!


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
                <PanelSearch show={this.props.currentDrawer == 'Search'} classes={this.props.classes}/>
                <HomePanel show={this.props.currentDrawer == 'Home'} classes={this.props.classes}/>
                <SubmitPanel show={this.props.currentDrawer == 'Submit'} classes={this.props.classes}/>
                <BrowsePanel show={this.props.currentDrawer == 'Browse'} classes={this.props.classes}/>
                <AdminPanel show={this.props.currentDrawer == 'Admin'} classes={this.props.classes}/>
            </div>
        );
    }
}

export default DashPanels;