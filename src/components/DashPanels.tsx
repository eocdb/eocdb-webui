import * as React from 'react';

import HomePanel from './home/HomePanel';
import SubmitPanel from './submit/SubmitPanel';
import BrowsePanel from './browse/BrowsePanel';
import AdminPanel from './admin/AdminPanel';
import SearchPanel from '../containers/search/SearchPanel';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles'; // TODO: dependency issue here!

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({});

interface DashPanelsProps extends WithStyles<typeof styles> {
    currentDrawer: string
}

class DashPanels extends React.PureComponent<DashPanelsProps> {
    constructor(props: DashPanelsProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchPanel show={this.props.currentDrawer == 'Search'}/>
                <HomePanel show={this.props.currentDrawer == 'Home'}/>
                <SubmitPanel show={this.props.currentDrawer == 'Submit'}/>
                <BrowsePanel show={this.props.currentDrawer == 'Browse'}/>
                <AdminPanel show={this.props.currentDrawer == 'Admin'}/>
            </div>
        );
    }
}

export default withStyles(styles)(DashPanels);