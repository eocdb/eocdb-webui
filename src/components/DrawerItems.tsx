import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, Search, SettingsApplications, CloudUpload, ViewList } from '@material-ui/icons';
import List from '@material-ui/core/List/List';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import { User } from "../types/user";

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({});

interface DrawerItemsProps extends WithStyles<typeof styles> {
    handleClick: (currentDrawer: string) => void;
    updateSubmissions: () => void;
    user?: User | null;
}

class DrawerItems extends React.PureComponent<DrawerItemsProps> {
    handleSubmitClick = () => {
        this.props.handleClick('Submit');
        this.props.updateSubmissions();
    };

    render() {
        //const hasLoggedInUser = !this.props.user;
        const hasLoggedInUser = false;
        return (
            <List>
                <div>
                    <ListItem key={'Home'} onClick={() => this.props.handleClick('Home')} button>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem key={'Search'} onClick={() => this.props.handleClick('Search')} button>
                        <ListItemIcon>
                            <Search/>
                        </ListItemIcon>
                        <ListItemText primary="Search"/>
                    </ListItem>
                    <ListItem key={'Browse'} onClick={() => this.props.handleClick('Browse')} button>
                        <ListItemIcon>
                            <ViewList/>
                        </ListItemIcon>
                        <ListItemText primary="Browse"/>
                    </ListItem>
                    <ListItem disabled={hasLoggedInUser} key={'Submit'} onClick={this.handleSubmitClick} button>
                        <ListItemIcon>
                            <CloudUpload/>
                        </ListItemIcon>
                        <ListItemText primary="Submit"/>
                    </ListItem>
                    <ListItem key={'Admin'} onClick={() => this.props.handleClick('Admin')} button>
                        <ListItemIcon>
                            <SettingsApplications/>
                        </ListItemIcon>
                        <ListItemText primary="Admin"/>
                    </ListItem>
                </div>
            </List>
        );
    }

}

export default withStyles(styles)(DrawerItems);
