import * as React from 'react';
import classNames from 'classnames';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { AccountCircle, Settings } from '@material-ui/icons';
import createStyles from '@material-ui/core/styles/createStyles';

import DrawerItems from './DrawerItems';
import DashPanels from './DashPanels';
import LoginDialog from '../containers/user/LoginDialog'; // TODO: dependency issue here!
import ConfigDialog from './admin/ConfigDialog';
import SearchHistory from "./search/SearchHistory";
import { User } from "../model";
import partnerLogos from "../resources/logos.png"
import { SearchHistoryItem } from "../types/dataset";
import { DatasetQuery } from "../api/findDatasets";


const drawerWidth = 240;

const styles = (theme: Theme) => createStyles(
    {
        root: {
            display: 'flex',
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 36,
        },
        hidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing.unit * 7,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing.unit * 9,
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing.unit * 3,
            height: '100vh',
            overflow: 'auto',
        },
        chartContainer: {
            marginLeft: -22,
        },
        tableContainer: {
            height: 320,
        },
        h5: {
            marginBottom: theme.spacing.unit * 2,
        },
        searchField: {
            width: '50%',
        },
        logo: {
            marginRight: theme.spacing.unit * 2,
        }
    });

interface DashboardProps extends WithStyles<typeof styles> {
    currentDrawer: string;
    changeDrawer: (currentDrawer: string) => void;

    loginDialogOpen: boolean;
    openLoginDialog: () => void;
    closeLoginDialog: () => void;
    loginUser: (name: string, password: string) => void;
    openRegistrationDialog: () => void;

    configDialogOpen: boolean;
    openConfigDialog: () => void;
    closeConfigDialog: () => void;

    apiServerUrl: string;
    apiServerUrlChange: (url: string) => void;

    user?: User | null;
    updateSubmissions: () => void;

    searchHistory: SearchHistoryItem[];
    updateSearchHistory: (searchHistory: SearchHistoryItem[]) => void;

    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
    searchDatasets: () => void;
}


interface DashboardState {
    open: boolean;
}


class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);

        this.state = {
            open: true,
        };
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleDrawerChanged = (currentDrawer: string) => {
        this.props.changeDrawer(currentDrawer);
    };

    handleConfigOpen = () => {
        //console.log('test');
        this.props.openConfigDialog();
    };

    handleConfigClose = () => {
        this.props.closeConfigDialog();
    };

    handleApiServerUrlChange = (url: string) => {
        this.props.apiServerUrlChange(url);
        this.handleConfigClose();
    };

    handleUpdateDatasetQuery = (selectedHistoryItem: SearchHistoryItem) => {
        this.props.updateDatasetQuery(selectedHistoryItem.query);
        this.props.searchDatasets();
    };

    handleDeleteHistoryItem = (searchHistoryItem: SearchHistoryItem) => {
        const history = Object.assign(this.props.searchHistory).filter((item: SearchHistoryItem) => {
            return item.key != searchHistoryItem.key
        });


        this.props.updateSearchHistory(history);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <LoginDialog/>
                <ConfigDialog open={this.props.configDialogOpen}
                              handleClose={this.handleConfigClose}
                              apiServerUrlChange={this.handleApiServerUrlChange}
                />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.hidden,
                            )}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h5"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Ocean Colour In-Situ Database
                        </Typography>

                        <img alt={'OCDB Logo'} src={partnerLogos} width={300} className={classes.logo}/>

                        <IconButton color="inherit" onClick={this.props.openConfigDialog}>
                            <Settings/>
                        </IconButton>
                        <IconButton color="inherit" onClick={this.props.openLoginDialog}>
                            <AccountCircle/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <DrawerItems updateSubmissions={this.props.updateSubmissions} user={this.props.user}
                                 handleClick={this.handleDrawerChanged}/>
                    <Divider/>

                    <SearchHistory
                        searchHistory={this.props.searchHistory}
                        onSearchHistoryItemClick={this.handleUpdateDatasetQuery}
                        onSearchHistoryItemDelete={this.handleDeleteHistoryItem}
                    />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <DashPanels currentDrawer={this.props.currentDrawer}/>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
