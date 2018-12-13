import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';

// TODO - forman - Store/restore items to/from localStorage later
const ITEMS = [
    ['My Search 1', 'ernie'],
    ['My Search 2', 'ernie'],
];

const listItems = [];

for (let i = 0; i < ITEMS.length; i++) {
    listItems.push(
        <ListItem button key={i}>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary={ITEMS[0]}/>
        </ListItem>
    );
}

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved Searches</ListSubheader>
        {listItems}
    </div>
);
