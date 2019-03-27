import * as React from "react";
import {Theme, withStyles, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import AssignmentIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {SearchHistoryItem} from "../../types/dataset";
import List from "@material-ui/core/List/List";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
});


interface SearchHistoryProps extends WithStyles<typeof styles> {
    searchHistory: SearchHistoryItem[];

    onSearchHistoryClick: (selectedSearchHistory: SearchHistoryItem) => void;
}


class SearchHistory extends React.PureComponent<SearchHistoryProps> {
    constructor(props: SearchHistoryProps) {
        super(props);
    }

    render() {
        return (
            <List>
                <ListSubheader inset>Saved Searches</ListSubheader>
                {this.props.searchHistory.map((item: SearchHistoryItem) => {
                    return (
                        <ListItem  onClick={() => this.props.onSearchHistoryClick(item)}  button key={item.key}>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item.key}/>
                            fds
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

export default withStyles(styles)(SearchHistory);

