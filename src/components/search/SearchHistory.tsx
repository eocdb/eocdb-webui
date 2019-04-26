import * as React from "react";
import { Button, Theme, Tooltip, withStyles, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
//import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import { SearchHistoryItem } from "../../types/dataset";
import List from "@material-ui/core/List/List";
import { Delete, Search } from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    rightIcon: {

    }
});


interface SearchHistoryProps extends WithStyles<typeof styles> {
    searchHistory: SearchHistoryItem[];

    onSearchHistoryItemClick: (selectedSearchHistory: SearchHistoryItem) => void;
    onSearchHistoryItemDelete: (selectedSearchHistory: SearchHistoryItem) => void;
}


class SearchHistory extends React.PureComponent<SearchHistoryProps> {
    constructor(props: SearchHistoryProps) {
        super(props);
    }

    render() {
        const {searchHistory} = this.props;
        return (
            <List>
                <div>

                {searchHistory.map((item: SearchHistoryItem) => {
                    return (
                        <ListItem button key={item.key}>
                            <ListItemIcon>
                                <Search/>
                            </ListItemIcon>
                            <ListItemText onClick={() => this.props.onSearchHistoryItemClick(item)} primary={item.key}/>
                            <Tooltip title="Delete History Item" aria-label="DeleteHistoryItem">
                                <Button
                                    onClick={() => this.props.onSearchHistoryItemDelete(item)}
                                >
                                    <Delete/>
                                </Button>
                            </Tooltip>
                        </ListItem>
                    );
                })}
                </div>
            </List>
        );
    }
}

export default withStyles(styles)(SearchHistory);

