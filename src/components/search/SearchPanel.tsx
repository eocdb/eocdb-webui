import * as React from 'react';
import Grid from '@mui/material/Grid';
import SearchMap from './SearchMap';
import { DatasetQuery } from '../../api/findDatasets';
import DataTable from "./DataTable";
import AdvancedSearchDialog from "./AdvancedSearchDialog";
import AdvancedSearchLog from "./AdvancedSearchLog";
import MultipleSelectTextField from "./MultipleSelectTextField";
import HelpDialog from "../messages/HelpDialog";
import { FindHelpText } from "../messages/Help/find";

import { SliderRange } from "../../types/advancedSearchDialog";
import { SearchHistoryItem } from "../../types/dataset";
import { ProductGroup, StoreInfo, User, QueryResult, Dataset } from "../../model";
import InputDialog from "./InputDialog";
import { ProductGroupsInfo } from "../messages/Help/productgroups";
import { GeoJsonObject } from "geojson";
import { LatLng, LatLngBounds } from "leaflet";
import { BBoxValue } from "./BBoxInput";
import { PlotRecord, PlotState } from "../../states/dataTableState";
import {
    Button,
    CircularProgress,
    Icon,
    IconButton,
    Stack,
    TextField
} from "@mui/material";
import { DatePicker } from "@mui/lab";


interface SearchPanelProps {
    show: boolean;

    datasetQuery: DatasetQuery;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
    searchDatasets: () => void;

    serverInfo: StoreInfo;

    advancedSearchDialogOpen: boolean;
    openAdvancedSearchDialog: () => void;
    closeAdvancedSearchDialog: () => void;

    productGroupsHelpDialogOpen: boolean;
    openProductGroupsHelpDialog: () => void;
    closeProductGroupsHelpDialog: () => void;

    helpDialogOpen: boolean;
    openHelpDialog: () => void;
    closeHelpDialog: () => void;

    saveSearchDialogOpen: boolean;
    openSaveSearchDialog: () => void;
    closeSaveSearchDialog: () => void;

    updateSaveSearchTitle: (saveSearchTitle: string) => void;
    saveSearchTitle: string;

    loading: boolean;
    startLoading: () => void;

    // Properties for Advanced Search Dialog

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

    updateSearchHistory: (searchHistory: SearchHistoryItem[]) => void;
    searchHistory: SearchHistoryItem[];

    // SearchMap Properties

    position: LatLng;
    zoom: number;

    updateSelectedRegions: (selectedRegions: GeoJsonObject, selectedBounds?: LatLngBounds, drawBounds?: boolean) => void;
    testMarkerCluster?: boolean;

    foundDatasets: QueryResult;
    drawMeasurementPoints?: boolean;

    updateSelectedDatasets: (selectedDatasets: string[], selectedBounds?: LatLngBounds) => void;
    selectedDatasets: string[];

    selectedBounds?: LatLngBounds;
    mapBounds?: LatLngBounds;
    drawBounds?: boolean;

    selectedManualBBox?: LatLngBounds;
    updateManualBBox: (selectedBBox: LatLngBounds) => void;
    openManualBBoxDialog: () => void;
    closeManualBBoxDialog: () => void;
    manualBBoxInputOpen: boolean;

    updateManualBBoxSouth: (south: number | string) => void;
    selectedBBoxSouth: number | string;

    updateManualBBoxWest: (west: number | string) => void;
    selectedBBoxWest: number | string;

    updateManualBBoxNorth: (north: number | string) => void;
    selectedBBoxNorth: number | string;

    updateManualBBoxEast: (east: number | string) => void;
    selectedBBoxEast: number | string;

    selectedRectangleFromAdvancedDialog?: BBoxValue;

    // Data Table

    data: QueryResult;
    page: number;
    rowsPerPage: number;

    updateDataPage: (page: number) => void;
    updateDataRowsPerPage: (rowsPerPage: number) => void;

    metaInfoDialogOpen: boolean;
    openMetaInfoDialog: () => void;
    closeMetaInfoDialog: () => void;

    helpMetaInfoDialogOpen: boolean;
    openHelpMetaInfoDialog: (helpMetaInfoKey: string) => void;
    closeHelpMetaInfoDialog: () => void;
    helpMetaInfoKey: string;

    plotDialogOpen: boolean;
    openPlotDialog: () => void;
    closePlotDialog: () => void;

    termsDialogOpen: boolean;
    openTermsDialog: () => void;
    closeTermsDialog: () => void;

    termsSingleDialogOpen: boolean;
    openTermsSingleDialog: () => void;
    closeTermsSingleDialog: () => void;

    updateDataset: (datasetId: string) => void;
    dataset: Dataset;

    apiServerUrl: string;
    downloadDocs: boolean;
    updateDownloadDocs: (downloadDocs: boolean) => void;

    startDownloading: () => void;

    downloadDatasets: () => void;
    downloadDataset: (id: string) => void;
    downloading: boolean;

    updatePlotState: (plotState: PlotState) => void;
    plotState: PlotState;

    updatePlotData: (plotData: PlotRecord[]) => void;
    plotData: PlotRecord[];


    user?: User | null;
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
                region: undefined,
                productMode: undefined,
                productNames: [],
                measurementType: undefined,
                wavelengthsMode: undefined,
                wdepth: [null, null],
                shallow: undefined,
            }
        );

        this.props.updateWavelength('all');
        this.props.updateOptShallow('');
        this.props.updateProducts([]);
        this.props.updateSelectedRegions({type: 'Polygon'});
    };

    handleUpdateSaveSearchTitle = (saveSearchTitle: string) => {
        this.props.updateSaveSearchTitle(saveSearchTitle);
    };

    handleSaveFilter = () => {
        let key = 'flt_';
        if (this.props.user) {
            key = this.props.user.name + '_';
        }

        const newItem: SearchHistoryItem = {
            key: this.props.saveSearchTitle,
            query: Object.assign(this.props.datasetQuery)
        };

        let newItemAdded = false;

        let history = this.props.searchHistory.map((item: SearchHistoryItem) => {
            if(item.key != this.props.saveSearchTitle) {
                return item;
            }
            else{
                newItemAdded = true;
                return newItem;
            }
        });

        if(!newItemAdded){
            history.push(newItem);
        }

        this.props.updateSearchHistory(history);

        localStorage.setItem(key + this.props.saveSearchTitle, JSON.stringify(newItem.query));

        this.props.closeSaveSearchDialog();
    };

    handleSearchExpKeyPressed = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSearchDatasets();
        }

    };

    handleSearchExprChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchExpr = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, searchExpr});
    };

    handleSearchExprBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchExpr = event.target.value;
        this.props.updateDatasetQuery({...this.props.datasetQuery, searchExpr});
    };

    convertDate = (dateString?: string) => {
        if (dateString) {
            const dtt = Date.parse (dateString);
            const newDate = new Date (dtt);
            return newDate.toISOString ().split ('T')[0];
        }
        else {
            return null;
        }
    };

    handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = this.convertDate(event ? event.toString() : null);

        this.props.updateDatasetQuery({...this.props.datasetQuery, startDate});
    };

    handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = this.convertDate(event ? event.toString() : null);

        this.props.updateDatasetQuery({...this.props.datasetQuery, endDate});
    };

    handleProductGroupsChange = (productGroups: string[]) => {
        const productGroupNames = productGroups.map((item: string) => {
            return item;
        });
        this.props.updateDatasetQuery({...this.props.datasetQuery, productGroupNames})
    };

    handleSearchDatasets = () => {
        this.props.startLoading();
        this.props.updateDataPage(0);
        this.props.searchDatasets();
    };

    getProductGroups = () => {
        return this.props.serverInfo['productGroups'].map(
            (pg: ProductGroup) => {
                return pg.name;
            })
    };

    getSelectedProducts = () => {
        return this.props.datasetQuery.productGroupNames.map((pg: string) => {
            return pg;
        });
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack direction={'row'}>
                        <DatePicker
                            label="From Date"
                            value={this.props.datasetQuery.startDate}
                            onChange={this.handleStartDateChange}
                            renderInput={(params) => <TextField sx={{'width': 400}} {...params} helperText={null} />}
                        />
                        <DatePicker
                            label="To Date"
                            value={this.props.datasetQuery.endDate}
                            onChange={this.handleEndDateChange}
                            renderInput={(params) => <TextField sx={{'width': 400}} {...params} helperText={null} />}
                        />
                        <MultipleSelectTextField
                            suggestions={this.getProductGroups()}
                            onChange={this.handleProductGroupsChange}
                            selectedItems={this.getSelectedProducts()}
                            isMulti={true}
                            closeMenuOnSelect={true}
                            placeholder={'Product Groups'}
                        />
                        <TextField
                            id={'lucene-search'}
                            key={'lucene-search'}
                            label={'Search...'}
                            variant={"outlined"}
                            value={this.props.datasetQuery.searchExpr}
                            onChange={this.handleSearchExprChange}
                            onKeyPress={this.handleSearchExpKeyPressed}
                            sx={{'width': 800}}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Stack direction={'row'} alignItems="center">
                        <IconButton
                            onClick={this.props.openHelpDialog}
                        >
                            <Icon color={"secondary"}>
                                help
                            </Icon>
                        </IconButton>
                        <Button onClick={this.handleClear} size={'small'}>
                            Clear
                        </Button>
                        <Button onClick={this.props.openSaveSearchDialog} size={'small'}>
                            Save Search
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <Stack direction={'row'} alignItems="center">
                        <Button onClick={this.props.openAdvancedSearchDialog} size={'small'}>
                            Advanced Options
                        </Button>
                        <Button variant="contained"
                                color="secondary"
                                onClick={this.handleSearchDatasets}>
                            Search
                            {this.props.loading && <CircularProgress size={24}/>}
                            <Icon>search</Icon>
                        </Button>
                    </Stack>
                    <HelpDialog
                        open={this.props.productGroupsHelpDialogOpen}
                        onClose={this.props.closeProductGroupsHelpDialog}
                        title={'Product Groups'}
                    >
                        {ProductGroupsInfo}
                    </HelpDialog>
                    <HelpDialog
                        open={this.props.helpDialogOpen}
                        onClose={this.props.closeHelpDialog}
                        title={'Search Help'}
                    >
                        {FindHelpText}
                    </HelpDialog>
                    <InputDialog
                        open={this.props.saveSearchDialogOpen}
                        onClose={this.props.closeSaveSearchDialog}
                        label={'Title'}
                        title={'Title of Saved Search'}
                        value={this.props.saveSearchTitle}
                        onSave={this.handleSaveFilter}
                        onChange={this.handleUpdateSaveSearchTitle}
                    />
                    <AdvancedSearchDialog
                        open={this.props.advancedSearchDialogOpen}
                        onClose={this.props.closeAdvancedSearchDialog}
                        productItems={this.props.serverInfo['products']}
                        onWavelengthChange={this.props.updateWavelength}
                        wavelengthValue={this.props.selectedWavelength}
                        onWaterDepthChange={this.props.updateWaterDepth}
                        waterDepthValue={this.props.selectedWaterDepth}
                        onOptShallowChange={this.props.updateOptShallow}
                        optShallowValue={this.props.selectedOptShallow}
                        onProductsChange={this.props.updateProducts}
                        productsValue={this.props.selectedProducts}
                    />

                    <AdvancedSearchLog
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
                <Grid item xs={6}>
                    <DataTable
                        data={this.props.data}
                        page={this.props.page}
                        rowsPerPage={this.props.rowsPerPage}

                        updateDataPage={this.props.updateDataPage}
                        updateDataRowsPerPage={this.props.updateDataRowsPerPage}

                        metaInfoDialogOpen={this.props.metaInfoDialogOpen}
                        openMetaInfoDialog={this.props.openMetaInfoDialog}
                        closeMetaInfoDialog={this.props.closeMetaInfoDialog}

                        helpMetaInfoDialogOpen={this.props.helpMetaInfoDialogOpen}
                        openHelpMetaInfoDialog={this.props.openHelpMetaInfoDialog}
                        closeHelpMetaInfoDialog={this.props.closeHelpMetaInfoDialog}
                        helpMetaInfoKey={this.props.helpMetaInfoKey}

                        plotDialogOpen={this.props.plotDialogOpen}
                        openPlotDialog={this.props.openPlotDialog}
                        closePlotDialog={this.props.closePlotDialog}

                        termsDialogOpen={this.props.termsDialogOpen}
                        openTermsDialog={this.props.openTermsDialog}
                        closeTermsDialog={this.props.closeTermsDialog}

                        termsSingleDialogOpen={this.props.termsSingleDialogOpen}
                        openTermsSingleDialog={this.props.openTermsSingleDialog}
                        closeTermsSingleDialog={this.props.closeTermsSingleDialog}

                        updateDataset={this.props.updateDataset}
                        dataset={this.props.dataset}

                        apiServerUrl={this.props.apiServerUrl}
                        downloadDocs={this.props.downloadDocs}
                        updateDownloadDocs={this.props.updateDownloadDocs}

                        startDownloading={this.props.startDownloading}

                        downloadDatasets={this.props.downloadDatasets}
                        downloadDataset={this.props.downloadDataset}
                        downloading={this.props.downloading}

                        updatePlotState={this.props.updatePlotState}
                        plotState={this.props.plotState}

                        updatePlotData={this.props.updatePlotData}
                        plotData={this.props.plotData}

                        searchDatasets={this.props.searchDatasets}
                        selectedDatasets={this.props.selectedDatasets}
                        updateSelectedDatasets={this.props.updateSelectedDatasets}
                        startLoading={this.props.startLoading}
                    />
                </Grid>
                <Grid item xs={6}>
                    <SearchMap
                        position={this.props.position}
                        zoom={this.props.zoom}

                        updateSelectedRegions={this.props.updateSelectedRegions}
                        testMarkerCluster={this.props.testMarkerCluster}

                        drawMeasurementPoints={this.props.drawMeasurementPoints}
                        foundDatasets={this.props.foundDatasets}

                        updateSelectedDatasets={this.props.updateSelectedDatasets}
                        selectedDatasets={this.props.selectedDatasets}

                        selectedBounds={this.props.selectedBounds}
                        mapBounds={this.props.mapBounds}
                        drawBounds={this.props.drawBounds}

                        selectedManualBBox={this.props.selectedManualBBox}
                        updateManualBBox={this.props.updateManualBBox}
                        openManualBBoxDialog={this.props.openManualBBoxDialog}
                        closeManualBBoxDialog={this.props.closeManualBBoxDialog}
                        manualBBoxInputOpen={this.props.manualBBoxInputOpen}

                        updateManualBBoxSouth={this.props.updateManualBBoxSouth}
                        selectedBBoxSouth={this.props.selectedBBoxSouth}

                        updateManualBBoxWest={this.props.updateManualBBoxWest}
                        selectedBBoxWest={this.props.selectedBBoxWest}

                        updateManualBBoxNorth={this.props.updateManualBBoxNorth}
                        selectedBBoxNorth={this.props.selectedBBoxNorth}

                        updateManualBBoxEast={this.props.updateManualBBoxEast}
                        selectedBBoxEast={this.props.selectedBBoxEast}

                        selectedRectangleFromAdvancedDialog={this.props.selectedRectangleFromAdvancedDialog}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default SearchPanel;
