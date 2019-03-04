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
import AdvancedSearchDialog from "./AdvancedSearchDialog";
import AdvancedSearchLog from "./AdvancedSearchLog";
import MultipleSelectTextField, { Suggestion } from "./MultipleSelectTextField";
import HelpDialog from "../messages/HelpDialog";
import { FindHelpText } from "../messages/Help/find";

import { DatePicker } from 'material-ui-pickers';
import { BBoxValue } from "./BBoxInput";
import { SliderRange } from "../../types/advancedSearchDialog";




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

    // Properties for Advanced Search Dolog

    updateBBox: (selectedBBox: BBoxValue) => void;
    selectedBBox: BBoxValue;

    updateWavelength: (item: string) => void;
    selectedWavelength: string;

    updateWaterDepth: (waterDepth: SliderRange) => void;
    selectedWaterDepth: SliderRange;

    updateOptShallow: (optShallow: string) => void;
    selectedOptShallow: string;

    updateProducts: (products: string[]) => void;
    selectedProducts: string[];

    updateProductValue: (productInputValue: string) => void;
    productInputValue: string;
}


class SearchPanel extends React.PureComponent<SearchPanelProps> {
    constructor(props: SearchPanelProps) {
        super(props);
    }

    handleClear = () => {
        this.props.updateDatasetQuery({
                ...this.props.datasetQuery,
                searchExpr: '',
                startDate: null,
                endDate: null,
                productGroupNames: [],
            }
        );
    };

    handleSearchExprChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchExpr = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, searchExpr});
    };

    handleSearchExprBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchExpr = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, searchExpr});
    };

    handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = event ? event.toString() : null;
        this.props.updateDatasetQuery({...this.props.datasetQuery, startDate});
    };

    handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = event ? event.toString() : null;
        this.props.updateDatasetQuery({...this.props.datasetQuery, endDate});
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
                        <DatePicker
                            keyboard
                            clearable
                            variant={"outlined"}
                            label="Start Date"
                            format="dd/MM/yyyy"
                            animateYearScrolling={false}
                            value={this.props.datasetQuery.startDate}
                            onChange={this.handleStartDateChange}
                        />
                        <DatePicker
                            keyboard
                            clearable
                            variant={"outlined"}
                            label="End Date"
                            format="dd/MM/yyyy"
                            animateYearScrolling={false}
                            value={this.props.datasetQuery.endDate}
                            onChange={this.handleEndDateChange}
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
                            value={this.props.datasetQuery.searchExpr}
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

                            onBBoxChange={this.props.updateBBox}
                            bboxValue={this.props.selectedBBox}
                            onWavelengthChange={this.props.updateWavelength}
                            wavelengthValue={this.props.selectedWavelength}
                            onWaterDepthChange={this.props.updateWaterDepth}
                            waterDepthValue={this.props.selectedWaterDepth}
                            onOptShallowChange={this.props.updateOptShallow}
                            optShallowValue={this.props.selectedOptShallow}
                            onProductsChange={this.props.updateProducts}
                            productsValue={this.props.selectedProducts}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AdvancedSearchLog
                            onBBoxChange={this.props.updateBBox}
                            bboxValue={this.props.selectedBBox}
                            onWavelengthChange={this.props.updateWavelength}
                            wavelengthValue={this.props.selectedWavelength}
                            onWaterDepthChange={this.props.updateWaterDepth}
                            waterDepthValue={this.props.selectedWaterDepth}
                            onOptShallowChange={this.props.updateOptShallow}
                            optShallowValue={this.props.selectedOptShallow}
                            onProductsChange={this.props.updateProducts}
                            productsValue={this.props.selectedProducts}
                        />
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
