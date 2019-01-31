import * as React from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Icon from '@material-ui/core/Icon/Icon';
import green from '@material-ui/core/colors/green';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';

import SearchMap from '../../containers/search/SearchMap';
import { DatasetQuery } from '../../api/index';
import { StoreInfo } from '../../types/dataset';
import MultipleSelect from './MultipleSelect';
import DataTable from "../../containers/search/DataTable";
import AdvancedSearchDialog from "../../containers/search/AdvancedSeachDialog";
import { AdvancedSearchItem } from "../../types/advancedSearchDialog";
import AdvancedSearchLog from "../../containers/search/AdvancedSearchLog";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    searchField: {
        width: 300,
    },
    textField: {},
    button: {},
    filterButton: {},
    rightIcon: {},
    tableContainer: {},
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});


interface SearchPanelProps extends WithStyles<typeof styles> {
    show: boolean;

    datasetQuery: DatasetQuery;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
    searchDatasets: () => void;

    serverInfo: StoreInfo;

    advancedSearchDialogOpen: boolean;
    openAdvancedSearchDialog: () => void;
    closeAdvancedSearchDialog: () => void;

    productGroupsOpen: boolean;
    openProductGroups: () => void;
    closeProductGroups: () => void;

    advancedFilterLog: AdvancedSearchItem[];
    advancedFilterChange: (filterLog: AdvancedSearchItem[]) => void;

    loading: boolean;
    startLoading: () => void;
}

class SearchPanel extends React.PureComponent<SearchPanelProps> {

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

    handleSearchDatasets = () => {
        this.props.startLoading();
        this.props.searchDatasets();
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes, datasetQuery} = this.props;
        const {searchExpr, startDate, endDate} = datasetQuery;

        return (
            <div>
                <Grid spacing={24} container direction={'row'} justify={'flex-start'} alignItems={"flex-start"}>
                    <Grid item container spacing={8} xs={12} sm={10}>
                        <TextField
                            id="measurement-from-date"
                            key="measurement-from-date"
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
                            key="measurement-to-date"
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
                        <Button
                            variant="outlined"
                            className={classes.filterButton}
                            onClick={this.props.openProductGroups}
                        >
                            Product Groups
                        </Button>
                        <MultipleSelect
                            open={this.props.productGroupsOpen}
                            onClose={this.props.closeProductGroups}
                            productGroups={this.props.serverInfo['productGroups']}
                            productGroupsChange={this.handleProductGroupsChange}
                        />
                        <TextField
                            id={'lucene-search'}
                            key={'lucene-search'}
                            label={'Expression'}
                            variant="outlined"
                            className={classes.searchField}
                            value={searchExpr}
                            onChange={this.handleSearchExprChange}
                        />
                    </Grid>
                    <Grid item container justify={"flex-end"} xs={12} sm>
                        <Button className={classes.button}
                                onClick={this.props.openAdvancedSearchDialog}>
                            Advanced
                        </Button>

                        <Button variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.handleSearchDatasets}>
                            Search
                            {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            <Icon className={classes.rightIcon}>search</Icon>
                        </Button>
                        <AdvancedSearchDialog
                            open={this.props.advancedSearchDialogOpen}
                            onClose={this.props.closeAdvancedSearchDialog}
                            logChange={this.props.advancedFilterChange}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AdvancedSearchLog/>
                        <DataTable/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SearchMap/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SearchPanel);
