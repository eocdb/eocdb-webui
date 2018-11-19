import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import List from "@material-ui/core/List/List";

import { Home, Search, FileCopy, SettingsApplications, ZoomIn } from "@material-ui/icons";

interface DrawerItemsProps {
    handleClick: (currentDrawer: string) => void;
}

class DrawerItems extends React.PureComponent<DrawerItemsProps> {
    constructor(props: DrawerItemsProps) {
        super(props);
    }

    render() {
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
                            <ZoomIn/>
                        </ListItemIcon>
                        <ListItemText primary="Browse"/>
                    </ListItem>
                    <ListItem key={'Submit'} onClick={() => this.props.handleClick('Submit')} button>
                        <ListItemIcon>
                            <FileCopy/>
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

export default DrawerItems;

