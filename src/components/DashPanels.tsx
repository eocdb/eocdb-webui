import * as React from 'react';

import SearchPanel from '../containers/search/SearchPanel';
import { SearchHistoryItem } from "../types/dataset";
import { User } from "../model";
import MatchupPanel from '../containers/matchup/MatchupPanel';
import AdminPanel from "../containers/admin/AdminPanel";
import ErrorBoundary from "./ErrorBoundary";


interface DashPanelsProps {
    currentDrawer: string;
    searchHistory: SearchHistoryItem[];
    user?: User | null;
}

class DashPanels extends React.PureComponent<DashPanelsProps> {
    constructor(props: DashPanelsProps) {
        super (props);
    }

    render() {
        return (
            <ErrorBoundary>
            <div>
                <SearchPanel user={this.props.user}
                             searchHistory={this.props.searchHistory}
                             show={this.props.currentDrawer == 'Search'}/>
                {/*<SubmissionPanel show={this.props.currentDrawer == 'Submit'}/>*/}
                {/*<BrowsePanel show={this.props.currentDrawer == 'Browse'}/>*/}
                {/*<LinksPanel show={this.props.currentDrawer == "Links"}/>*/}

                <MatchupPanel show={this.props.currentDrawer == 'Home'}/>

                <AdminPanel show={this.props.currentDrawer == 'Admin'}/>
            </div>
            </ErrorBoundary>
        );
    }
}

export default DashPanels;
