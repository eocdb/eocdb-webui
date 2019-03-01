import * as React from 'react';

import {
    IconButton,
    CircularProgress,
    TextField,
    Icon,
    Button,
    Grid,
    Theme,
    WithStyles
} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';

import SearchMap from '../../containers/search/SearchMap';
import { DatasetQuery } from '../../api';
import { ProductGroup, StoreInfo } from '../../model';
import DataTable from "../../containers/search/DataTable";
import AdvancedSearchDialog from "../../containers/search/AdvancedSearchDialog";
import AdvancedSearchLog from "../../containers/search/AdvancedSearchLog";
import MultipleSelectTextField, { Suggestion } from "./MultipleSelectTextField";
import HelpDialog from "../messages/HelpDialog";
import { FindHelpText } from "../messages/Help/find";



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
        color: theme.palette.primary.light,
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

    helpDialogOpen: boolean;
    openHelpDialog: () => void;
    closeHelpDialog: () => void;


    loading: boolean;
    startLoading: () => void;
}


interface SearchPanelState {
    currentSearchExpr: string;
    currentStartDate: string;
    currentEndDate: string;
}


class SearchPanel extends React.PureComponent<SearchPanelProps, SearchPanelState> {
    constructor(props: SearchPanelProps) {
        super(props);

        this.state = {
            currentSearchExpr: '',
            currentStartDate: '',
            currentEndDate: '',
        }
    }

    handleClear = () => {
        this.setState({
            currentSearchExpr: '',
            currentStartDate: '',
            currentEndDate: '',
        });

        this.props.updateDatasetQuery({
                ...this.props.datasetQuery,
                searchExpr: '',
                startDate: '',
                endDate: '',
                productGroupNames: [],
            }
        );
    };

    handleSearchExprChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentSearchExpr: event.target.value});
    };

    handleSearchExprBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchExpr = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, searchExpr});
    };

    handleStartDateBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, startDate});
    };

    handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentStartDate: event.target.value});
    };

    handleEndDateBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, endDate});
    };

    handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentEndDate: event.target.value});
    };

    handleProductGroupsChange = (productGroups: Suggestion[]) => {
        const productGroupNames = productGroups.map((item: Suggestion) => {
            return item.value;
        });
        this.props.updateDatasetQuery({...this.props.datasetQuery, productGroupNames})
    };

    handleSearchDatasets = () => {
        this.props.startLoading();
        this.props.searchDatasets();
    };

    getProductGroups = () => {
        return this.props.serverInfo['productGroups'].map(
            (pg: ProductGroup) => {
                return {value: pg.name, label: pg.name};
            })
    };

    getSelectedProducts = () => {
        return this.props.datasetQuery.productGroupNames.map((pg: string) => {
            return {label: pg, value: pg};
        });
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes} = this.props;

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
                            value={this.state.currentStartDate}
                            onChange={this.handleStartDateChange}
                            onBlur={this.handleStartDateBlur}
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
                            value={this.state.currentEndDate}
                            onChange={this.handleEndDateChange}
                            onBlur={this.handleEndDateBlur}
                        />
                        <MultipleSelectTextField
                            suggestions={this.getProductGroups()}
                            onChange={this.handleProductGroupsChange}
                            selectedItems={this.getSelectedProducts()}
                            isMulti={true}
                            closeMenuOnSelect={true}
                            inputLabel={'Product Groups'}
                            inputLabelWidth={124}
                        />
                        <TextField
                            id={'lucene-search'}
                            key={'lucene-search'}
                            label={'Expression'}
                            variant="outlined"
                            className={classes.searchField}
                            value={this.state.currentSearchExpr}
                            onChange={this.handleSearchExprChange}
                            onBlur={this.handleSearchExprBlur}
                        />
                        <IconButton
                            onClick={this.props.openHelpDialog}
                        >
                            <Icon color={"secondary"}>
                                help
                            </Icon>
                        </IconButton>
                        <HelpDialog
                            open={this.props.helpDialogOpen}
                            onClose={this.props.closeHelpDialog}
                            title={'Filter Help'}
                        >
                            {FindHelpText}
                        </HelpDialog>
                        <Button className={classes.button}
                                onClick={this.handleClear}>
                            Clear
                        </Button>

                    </Grid>
                    <Grid item container justify={"flex-end"} xs={12} sm>
                        <Button className={classes.button}
                                onClick={this.props.openAdvancedSearchDialog}>
                            Advanced Options
                        </Button>

                        <Button variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.handleSearchDatasets}>
                            Search
                            {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            <Icon className={classes.rightIcon}>search</Icon>
                        </Button>
                        <AdvancedSearchDialog
                            open={this.props.advancedSearchDialogOpen}
                            onClose={this.props.closeAdvancedSearchDialog}
                            productItems={this.props.serverInfo['products']}
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
