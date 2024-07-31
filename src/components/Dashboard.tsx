import * as React from 'react';

import DrawerItems from './DrawerItems';
import DashPanels from './DashPanels';
import LoginDialog from './user/LoginDialog';
import { DatasetQuery, User } from "../model";
import partnerLogos from "../resources/logos.png"
import { SearchHistoryItem } from "../types/dataset";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
    Box,
    CssBaseline, Divider,
    Drawer,
    IconButton, List, styled,
    Toolbar,
    Typography, useTheme
} from "@mui/material";

import { Menu, AccountCircle, Help, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { SubmissionQuery } from "../model/Submission";
import SearchHistory from "./search/SearchHistory";
import UserRegistrationDialog from "./user/UserRegistrationDialog";


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


interface DashboardProps {
    currentDrawer: string;
    changeDrawer: (currentDrawer: string) => void;

    loginDialogOpen: boolean;
    openLoginDialog: () => void;
    closeLoginDialog: () => void;
    loginUser: (name: string, password: string) => void;

    configDialogOpen: boolean;
    openConfigDialog: () => void;
    closeConfigDialog: () => void;

    apiServerUrl: string;
    apiServerUrlChange: (url: string) => void;

    user?: User | null;
    updateSubmissionQuery: (submissionQuery: SubmissionQuery) => void;
    getSubmissionsForUser: () => void;
    getMatchupFiles: () => void;

    searchHistory: SearchHistoryItem[];
    updateSearchHistory: (searchHistory: SearchHistoryItem[]) => void;

    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
    searchDatasets: () => void;

    // LoginDialog

    userName: string;
    userLoginError: string | null;
    userLoginInProgress: boolean;

    logoutUser: () => void;
    openUserRegistrationDialog: () => void;
    closeUserRegistrationDialog: () => void;
    userRegistrationDialogOpen: boolean;

    openChangeUserLoginDialog: () => void;
    closeChangeUserLoginDialog: () => void;
    changeUserLoginDialogOpen: boolean;
    changeLoginUser: (username: string, oldPassword: string, newPassword1: string, newPassword2: string) => void;
}


export default function Dashboard(props: DashboardProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const helpUrl = window.location.host.startsWith('ocdb.') ? 'https://ocdb.eumetsat.int/docs/' :'https://ocdb-stage.eumetsat.int/docs/'

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerChanged = (currentDrawer: string) => {
        props.changeDrawer(currentDrawer);
    };

    const handleUpdateDatasetQuery = (selectedHistoryItem: SearchHistoryItem) => {
        props.updateDatasetQuery(selectedHistoryItem.query);
        props.searchDatasets();
    };

    const handleDeleteHistoryItem = (searchHistoryItem: SearchHistoryItem) => {
        const history = Object.assign(props.searchHistory).filter((item: SearchHistoryItem) => {
            return item.key != (searchHistoryItem.key);
        });

        localStorage.removeItem(searchHistoryItem.key);
        props.updateSearchHistory(history);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <LoginDialog
                open={props.loginDialogOpen}
                userName={props.userName}
                userLoginError={props.userLoginError}
                userLoginInProgress={props.userLoginInProgress}
                openRegistrationDialog={props.openUserRegistrationDialog}
                closeLoginDialog={props.closeLoginDialog}
                loginUser={props.loginUser}
                logoutUser={props.logoutUser}

                openChangeUserLoginDialog={props.openChangeUserLoginDialog}
            />
            <UserRegistrationDialog
                open={props.userRegistrationDialogOpen}
                onClose={props.closeUserRegistrationDialog}
            />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Ocean Colour In-Situ Database
                    </Typography>
                    <img alt={'OCDB Logo'} src={partnerLogos} width={300} />

                    <IconButton color="inherit"
                                target={'_blank'}
                                href={helpUrl}
                    >
                        <Help />
                    </IconButton>
                    <IconButton color="inherit" onClick={props.openLoginDialog}>
                    {/*<IconButton color="inherit" onClick={() => keycloak.login()}>*/}
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <DrawerItems
                        updateSubmissionQuery={props.updateSubmissionQuery}
                        getSubmissionsForUser={props.getSubmissionsForUser}
                        getMatchupFiles={props.getMatchupFiles}
                        user={props.user}
                        handleClick={handleDrawerChanged}
                    />
                </List>
                <Divider />
                <SearchHistory
                    searchHistory={props.searchHistory}
                    onSearchHistoryItemClick={handleUpdateDatasetQuery}
                    onSearchHistoryItemDelete={handleDeleteHistoryItem}
                />
            </Drawer>
            <Main open={open} sx={{width: `calc(100% - ${drawerWidth}px)`}}>
                <DrawerHeader />
                <DashPanels user={props.user}
                            searchHistory={props.searchHistory}
                            currentDrawer={props.currentDrawer}
                />
            </Main>
        </Box>
    );
}

