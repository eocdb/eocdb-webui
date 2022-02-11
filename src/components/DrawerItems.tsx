import * as React from 'react';
import { User } from "../model";
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AttachFile, CloudUpload, Link, Search, SettingsApplications } from "@mui/icons-material";

// noinspection JSUnusedLocalSymbols

interface DrawerItemsProps {
    handleClick: (currentDrawer: string) => void;
    updateSubmissions: () => void;
    getMatchupFiles: () => void;
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

    handleMatchupClick = () => {
        this.props.handleClick('Matchup');
        this.props.getMatchupFiles();
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
                <ListItem key={'Matchup'} onClick={() => this.handleMatchupClick()} button>
                    <ListItemIcon>
                        <AttachFile/>
                    </ListItemIcon>
                    <ListItemText primary="Matchup"/>
                </ListItem>
                {/*<ListItem disabled={!submitAllowed} key={'Submit'} onClick={this.handleSubmissionClick} button>*/}
                {/*    <ListItemIcon>*/}
                {/*        <CloudUpload/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Submit"/>*/}
                {/*</ListItem>*/}
                {/*<ListItem disabled={!adminAllowed}  key={'Admin'} onClick={() => this.props.handleClick('Admin')} button>*/}
                {/*    <ListItemIcon>*/}
                {/*        <SettingsApplications/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Admin"/>*/}
                {/*</ListItem>*/}
            </List>
        );
    }

}

export default DrawerItems;
