import * as React from "react";
import { Theme, withStyles, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import AssignmentIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import { SearchHistoryItem } from "../../types/dataset";
import List from "@material-ui/core/List/List";


const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
});


interface SearchHistoryProps extends WithStyles<typeof styles>{
    searchHistory: SearchHistoryItem[];
}


class SearchHistory extends React.Component<SearchHistoryProps>{
    constructor(props: SearchHistoryProps){
        super(props);
    }

    render(){
        let res = [];
        console.log(this.props.searchHistory);

        for (let i = 0; i <this.props.searchHistory.length; i++) {
            const item = this.props.searchHistory[i];
            res.push(
                <ListItem button key={i}>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary={item.key}/>
                </ListItem>
            );
        }

        return(
            <List>
                <ListSubheader inset>Saved Searches</ListSubheader>
                {res}
            </List>
        );
    }
}

export default withStyles(styles)(SearchHistory);

