import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Search, SettingsApplications, CloudUpload, Link } from '@material-ui/icons';
import List from '@material-ui/core/List/List';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import { User } from "../model";

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({});

interface DrawerItemsProps extends WithStyles<typeof styles> {
    handleClick: (currentDrawer: string) => void;
    updateSubmissions: () => void;
    user?: User | null;
}

class DrawerItems extends React.PureComponent<DrawerItemsProps> {
    constructor(props: DrawerItemsProps) {
        super(props);
    }

    handleSubmissionClick = () => {
        this.props.handleClick('Submit');
        this.props.updateSubmissions();
    };

    render() {
        let submitAllowed = false;

        if(this.props.user){
            if(this.props.user.roles.indexOf('submit') > -1){
                submitAllowed = true;
            }
        }

        let adminAllowed = false;

        if(this.props.user){
            if(this.props.user.roles.indexOf('admin') > -1){
                adminAllowed = true;
                submitAllowed = true;
            }
        }

        return (
            <List>
                <div>
                    {/*<ListItem key={'Home'} onClick={() => this.props.handleClick('Home')} button>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>*/}
                    <ListItem key={'Search'} onClick={() => this.props.handleClick('Search')} button>
                        <ListItemIcon>
                            <Search/>
                        </ListItemIcon>
                        <ListItemText primary="Search"/>
                    </ListItem>
                    <ListItem key={'Links'} onClick={() => this.props.handleClick('Links')} button>
                        <ListItemIcon>
                            <Link/>
                        </ListItemIcon>
                        <ListItemText primary="Links"/>
                    </ListItem>
                    {/*<ListItem key={'Browse'} onClick={() => this.props.handleClick('Browse')} button>
                        <ListItemIcon>
                            <ViewList/>
                        </ListItemIcon>
                        <ListItemText primary="Browse"/>
                    </ListItem>*/}
                    <ListItem disabled={!submitAllowed} key={'Submit'} onClick={this.handleSubmissionClick} button>
                        <ListItemIcon>
                            <CloudUpload/>
                        </ListItemIcon>
                        <ListItemText primary="Submit"/>
                    </ListItem>
                    <ListItem disabled={!adminAllowed}  key={'Admin'} onClick={() => this.props.handleClick('Admin')} button>
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
