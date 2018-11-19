import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';


localStorage.clear();
localStorage.setItem('search1', 'ernie');
localStorage.setItem('search2', 'ernie');

let res = [];

for (let i = 0; i < localStorage.length; i++){
    res.push(
        <ListItem button key={i}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={localStorage.key(i)} />
        </ListItem>
    );
}

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        {res}
    </div>
);