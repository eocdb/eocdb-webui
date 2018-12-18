import * as React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Icon from '@material-ui/core/Icon/Icon';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';

import SearchMap from '../../containers/search/SearchMap';
import { DatasetQuery } from '../../api/index';
import { StoreInfo } from '../../types/dataset';
import MultipleSelect from './MultipleSelect';
import DataTable from '../../containers/search/DataTable';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Star, HelpOutline } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import { SearchExprHelpDialog } from './SearchExprHelpDialog';


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        searchField: {
            width: 300,
        },
        textField: {},
        button: {},
        rightIcon: {},
        tableContainer: {},
    });

interface SearchPanelProps extends WithStyles<typeof styles> {
    show: boolean;

    datasetQuery: DatasetQuery;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
    searchDatasets: () => void;

    serverInfo: StoreInfo;

    //updateSearchHistory: () => void;
    //searchHistory: SearchHistoryItem[];
}

interface SearchPanelState {
    exprHelpDialogOpen: boolean;
}

class SearchPanel extends React.PureComponent<SearchPanelProps, SearchPanelState> {

    handleSearchExprChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchExpr = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, searchExpr});
    };

    handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, startDate});
    };

    handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, endDate});
    };

    handleProductGroupsChange = (productGroupNames: string[]) => {
        this.props.updateDatasetQuery({...this.props.datasetQuery, productGroupNames})
    };

    handleClickExprHelpOpen = () => {
        this.setState({exprHelpDialogOpen: true});
    };

    handleClickExprHelpClose = () => {
        this.setState({exprHelpDialogOpen: false});
    };

    constructor(props: SearchPanelProps) {
        super(props);
        this.state = {exprHelpDialogOpen: false};
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes, datasetQuery} = this.props;
        const {searchExpr, startDate, endDate} = datasetQuery;

        return (
            <div>
                <SearchExprHelpDialog open={this.state.exprHelpDialogOpen} onClose={this.handleClickExprHelpClose}/>
                <Grid spacing={24} container direction={'row'} justify={'flex-start'} alignItems={'flex-start'}>
                    <Grid item container spacing={8} xs={12} sm={10}>
                        <TextField
                            id="measurement-from-date"
                            label="Measured From"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={startDate}
                            onChange={this.handleStartDateChange}
                        />
                        <TextField
                            id="measurement-to-date"
                            label="Measured To"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={endDate}
                            onChange={this.handleEndDateChange}
                        />
                        <MultipleSelect
                            productGroups={this.props.serverInfo['productGroups']}
                            productGroupsChange={this.handleProductGroupsChange}
                        />
                        <TextField
                            id={'lucene-search'}
                            label={'Expression'}
                            variant="outlined"
                            className={classes.searchField}
                            value={searchExpr}
                            onChange={this.handleSearchExprChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Expression help"
                                            onClick={this.handleClickExprHelpOpen}
                                        >
                                            <HelpOutline/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item container justify={'flex-end'} xs={12} sm>
                        <IconButton color="primary">
                            <Star/>
                        </IconButton>

                        <Button variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.props.searchDatasets}>
                            Search
                            <Icon className={classes.rightIcon}>search</Icon>
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className={classes.tableContainer}>
                            <DataTable/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.tableContainer}>
                            <SearchMap/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SearchPanel);
