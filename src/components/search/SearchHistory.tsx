import * as React from "react";
import { Button, Theme, Tooltip, withStyles, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
//import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import { SearchHistoryItem } from "../../types/dataset";
import List from "@material-ui/core/List/List";
import Delete from "@material-ui/icons/Delete";
import Code from "@material-ui/icons/Code";
import APICodeDialog from "./ApiCodeDialog";
import { collectComponents, DatasetQuery } from "../../api/findDatasets";
import { QueryComponent } from "../../api/callApi";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    rightIcon: {
        width: "10pt"
    }
});


export function makeFunctionCall(url: string, queryComponents?: QueryComponent[]) {
    if (queryComponents && queryComponents.length > 0) {
        return queryComponents.map((kv: any) => {
            //console.log(kv);
            return `${kv[0]}="${kv[1]}"`;
        }).join(',')
    }

    return '';
}

interface SearchHistoryProps extends WithStyles<typeof styles> {
    searchHistory: SearchHistoryItem[];

    onSearchHistoryItemClick: (selectedSearchHistory: SearchHistoryItem) => void;
    onSearchHistoryItemDelete: (selectedSearchHistory: SearchHistoryItem) => void;
}


interface SearchHistoryState {
    apiCodeDialogOpen: boolean;
    query: string;
}

class SearchHistory extends React.PureComponent<SearchHistoryProps, SearchHistoryState> {
    constructor(props: SearchHistoryProps) {
        super(props);

        this.state = {
            apiCodeDialogOpen: false,
            query: '',
        }
    }

    handleApiCodeOpen = (dq: DatasetQuery) => {
        const comps = collectComponents(dq);
        const query = makeFunctionCall('', comps);
        this.setState({apiCodeDialogOpen: true, query: query});
    };

    handleApiCodeClose = () => {
        this.setState({apiCodeDialogOpen: false, query: ''});
    };

    render() {
        const {searchHistory} = this.props;
        return (
            <List>
                <div>
                    <APICodeDialog
                        open={this.state.apiCodeDialogOpen}
                        onClose={this.handleApiCodeClose}
                        query={this.state.query}
                    />

                    {searchHistory.map((item: SearchHistoryItem) => {
                        return (
                            <ListItem button key={item.key}>
                                <Button
                                    onClick={() => this.handleApiCodeOpen(item.query)}
                                    className={this.props.classes.rightIcon}
                                    style={{marginLeft: '1pt', paddingLeft: '1pt', paddingRight: '1pt'}}
                                >
                                    <Code/>
                                </Button>

                                <ListItemText onClick={() => this.props.onSearchHistoryItemClick(item)}
                                              primary={item.key}/>

                                <Tooltip title="Delete History Item" aria-label="DeleteHistoryItem">
                                    <Button
                                        onClick={() => this.props.onSearchHistoryItemDelete(item)}
                                        className={this.props.classes.rightIcon}
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

