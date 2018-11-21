import * as React from 'react';
import classNames from 'classnames';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Star, AccountCircle, Settings } from '@material-ui/icons';
import createStyles from '@material-ui/core/styles/createStyles';

import { secondaryListItems } from './listitems';
import eumetsatLogo from './eumetsat.png';
import DrawerItems from './DrawerItems';
import DashPanels from './DashPanels';
import LoginDialog from '../containers/user/LoginDialog'; // TODO: dependency issue here!
import ConfigDialog from './admin/ConfigDialog';


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
}


interface DashboardState {
    open: boolean;
}


class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps){
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
        console.log('test');
        this.props.openConfigDialog();
    };

    handleConfigClose = () => {
        this.props.closeConfigDialog();
    };

    handleApiServerUrlChange = (url: string) => {
        this.props.apiServerUrlChange(url);
        this.handleConfigClose();
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
                            <img src={eumetsatLogo} height={48}/> Ocean Colour In-Situ Database
                        </Typography>

                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <Star/>
                            </Badge>
                        </IconButton>
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
                    <DrawerItems handleClick={this.handleDrawerChanged}/>
                    <Divider/>

                    <List>
                        {secondaryListItems}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <DashPanels currentDrawer={this.props.currentDrawer} classes={classes}/>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
