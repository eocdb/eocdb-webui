import * as React from 'react';

import HomePanel from './home/HomePanel';
import SearchPanel from '../containers/search/SearchPanel';
import { SearchHistoryItem } from "../types/dataset";
import { User } from "../model";

// const styles = (theme: Theme) => createStyles (
//     {
//         root: {
//             display: 'flex',
//         },
//         toolbar: {
//             paddingRight: 24, // keep right padding when drawer closed
//         },
//         toolbarIcon: {
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'flex-end',
//             padding: '0 8px',
//             ...theme.mixins.toolbar,
//         },
//         appBar: {
//             zIndex: theme.zIndex.drawer + 1,
//             transition: theme.transitions.create (['width', 'margin'], {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//             }),
//         },
//         appBarShift: {
//             marginLeft: drawerWidth,
//             width: `calc(100% - ${drawerWidth}px)`,
//             transition: theme.transitions.create (['width', 'margin'], {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//         },
//         menuButton: {
//             marginLeft: 12,
//             marginRight: 36,
//         },
//         hidden: {
//             display: 'none',
//         },
//         title: {
//             flexGrow: 1,
//         },
//         drawerPaper: {
//             position: 'relative',
//             whiteSpace: 'nowrap',
//             width: drawerWidth,
//             transition: theme.transitions.create ('width', {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//         },
//         drawerPaperClose: {
//             overflowX: 'hidden',
//             transition: theme.transitions.create ('width', {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//             }),
//             width: theme.spacing.unit * 7,
//             [theme.breakpoints.up ('sm')]: {
//                 width: theme.spacing.unit * 9,
//             },
//         },
//         appBarSpacer: theme.mixins.toolbar,
//         content: {
//             flexGrow: 1,
//             padding: theme.spacing.unit * 3,
//             height: '100vh',
//             overflow: 'auto',
//         },
//         chartContainer: {
//             marginLeft: -22,
//         },
//         tableContainer: {
//             height: 320,
//         },
//         h5: {
//             marginBottom: theme.spacing.unit * 2,
//         },
//         searchField: {
//             width: '50%',
//         }
//     });


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
            <div>
                <SearchPanel user={this.props.user}
                             searchHistory={this.props.searchHistory}
                             show={this.props.currentDrawer == 'Search'}/>
                <HomePanel show={this.props.currentDrawer == 'Home'}/>
                {/*<SubmissionPanel show={this.props.currentDrawer == 'Submit'}/>*/}
                {/*<BrowsePanel show={this.props.currentDrawer == 'Browse'}/>*/}
                {/*<LinksPanel show={this.props.currentDrawer == "Links"}/>*/}
                {/*<MatchupPanel show={this.props.currentDrawer == "Matchup"}/>*/}
                {/*<AdminPanel show={this.props.currentDrawer == 'Admin'}/>*/}
            </div>
        );
    }
}

export default DashPanels;
