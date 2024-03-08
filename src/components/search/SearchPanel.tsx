// noinspection RequiredAttributes

import * as React from 'react';
import Grid from '@mui/material/Grid';
import SearchMap from './SearchMap';
import DataTable from "./DataTable";
import AdvancedSearchDialog from "./AdvancedSearchDialog";
import AdvancedSearchLog from "./AdvancedSearchLog";
import MultipleSelectTextField from "./MultipleSelectTextField";
import HelpDialog from "../messages/HelpDialog";
import { FindHelpText } from "../messages/Help/find";

import { SliderRange } from "../../types/advancedSearchDialog";
import { SearchHistoryItem } from "../../types/dataset";
import { ProductGroup, StoreInfo, User, QueryResult, Dataset, DatasetQuery, Product, MetaInfoFields } from "../../model";
import InputDialog from "./InputDialog";
import { ProductGroupsInfo } from "../messages/Help/productgroups";
import { GeoJsonObject } from "geojson";
import { LatLng, LatLngBounds } from "leaflet";
import { BBoxValue } from "./BBoxInputDialog";
import { PlotRecord, PlotState } from "../../states/dataTableState";
import {
    Button,
    CircularProgress,
    Icon,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DefaultDatasetQuery } from "../../model/DatasetQuery";
import { SEARCH_HISTORY_PREFIX } from "../../default";
import ShowAlertMessage from './ShowAlertMessage';

interface SearchPanelProps {
    show: boolean;

    datasetQuery: DatasetQuery;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
    searchDatasets: (metaInfo?: MetaInfoFields) => void;

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
        this.state = {
            alertOpen: false,
        };
    }
    
    message: string;

    alertState: any;

    metaInfo: MetaInfoFields = {
        fields: [ 'None',
            'Investigators',
            'Affiliations',
            'Contact',
            'Experiment',
            'Cruise',
            'Filename',
            'Station',]
    }
    
    
    handleClear = () => {
        this.props.updateDatasetQuery(DefaultDatasetQuery);
        this.props.updateSelectedRegions({type: 'Polygon'});
    };

    handleUpdateSaveSearchTitle = (saveSearchTitle: string) => {
        this.props.updateSaveSearchTitle(saveSearchTitle);
    };

    handleSaveFilter = () => {
        const key = SEARCH_HISTORY_PREFIX + this.props.saveSearchTitle
        const newItem: SearchHistoryItem = {
            key: key,
            query: Object.assign(this.props.datasetQuery)
        };

        let newItemAdded = false;

        let history = this.props.searchHistory.map((item: SearchHistoryItem) => {
            if (item.key != key) {
                return item;
            } else {
                newItemAdded = true;
                return newItem;
            }
        });

        if (!newItemAdded) {
            history.push(newItem);
        }

        this.props.updateSearchHistory(history);

        localStorage.setItem(key, JSON.stringify(newItem.query));

        this.props.closeSaveSearchDialog();
    };


    showAlert = () => {
        this.setState({ alertOpen: true });
        this.alertState = true;
    };

    closeAlert = () => {
        this.setState({ alertOpen: false });
        this.alertState = false;
        this.message = '';
    };

    handleSearchExpKeyPressed = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSearchDatasets();
        }
        if (event.code === 'Space'){
            event.preventDefault();
            this.message = "Space cannot be used in the search text field";
            this.showAlert();
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
            const idxGMT = dateString.indexOf('GMT');
            if (idxGMT == -1) return null
            const dateStrToParse = dateString.substr(0, idxGMT + 3);
            const dtt = Date.parse(dateStrToParse);
            const newDate = new Date(dtt);
            return newDate.toISOString().split('T')[0];
        } else {
            return null;
        }
    };

    handleStartDateChange = (date) => {
        const convDate = this.convertDate(date ? date.$d.toString() : null);
        this.props.updateDatasetQuery({...this.props.datasetQuery, startDate: convDate});
    };

    handleEndDateChange = (date) => {
        const convDate = this.convertDate(date ? date.$d.toString() : null);
        this.props.updateDatasetQuery({...this.props.datasetQuery, endDate: convDate});
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
    
        let productNames : Product[];
        productNames = this.props.serverInfo['products'];
        let productFound = false;
    
        if(this.props.datasetQuery.searchExpr != null && this.props.datasetQuery.searchExpr != ''){
            productNames.forEach((product) => {
                if(this.props.datasetQuery.searchExpr == product.name.toLowerCase()){
                    this.message = 'For '+ this.props.datasetQuery.searchExpr + ', please use the product search combo box on the right.';
                    this.props.datasetQuery.searchExpr = null;
                    this.props.searchDatasets();
                    this.showAlert();
                    productFound = true;
                }
            });
        }
    
        if(!productFound){
            this.props.searchDatasets(this.metaInfo);
        }
    };

    handleUpdateProducts = (products: string[]) => {
        const items = products.map((item: string) => {
            return item;
        });
        const datasetQuery = { ...this.props.datasetQuery, productNames: items }
        this.props.updateDatasetQuery(datasetQuery);
    };

    makeProductSuggestions = () => {
        if (this.props.datasetQuery.productGroupNames.length == 0) {
            return this.props.serverInfo['products'].map(
                (item: Product) => {
                    return item.name;
                })
        }
        const productGroupNames = this.props.datasetQuery.productGroupNames;
        let productNames:string[] = [];
        for (const productGroupName of productGroupNames) {
            for (const productGroup of this.props.serverInfo.productGroups) {
                if (productGroup.name == productGroupName) {
                    productNames = productNames.concat(productGroup.products);
                }
            }
        }
        const products: Product[] = [];
        for (const product of this.props.serverInfo.products) {
            if (productNames.includes(product.name)) {
                products.push(product);
            }
        }
        return products.map(
            (item: Product) => {
                return item.name;
            })
    };

    makeFieldSuggestions = () => {
        return this.metaInfo.fields.map(
            (item) => {
                return item;
            })

    };

    handleFieldChange = (searchcategory: string[]) => {
        let selecteditem = '';
        const items = searchcategory.map((item: string) => {
            selecteditem = item;
            return item;
        });
        const datasetQuery = { ...this.props.datasetQuery, metadatafields: items }
        this.props.updateDatasetQuery(datasetQuery);
    };

    getProductGroups = () => {
        return this.props.serverInfo['productGroups'].map(
            (pg: ProductGroup) => {
                return pg.name;
            })
    };

    getSelectedProducts = () => {  /* todo se 2024.03.08 --> rename? Der Kontext ist doch Produkt Gruppen und nicht Produkte */
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
                <Grid item xs={8} md={12}>
                    <Stack spacing={0.8} direction={'row'}>
                        <DatePicker
                            label="From Date (GMT)"
                            value={this.props.datasetQuery.startDate}
                            onChange={this.handleStartDateChange}
                            renderInput={(params) => <TextField
                                size={'small'}
                                sx={{ 'minWidth': '175px', 'maxWidth': '175px' }} {...params} helperText={null} />}
                        />
                        <DatePicker
                            label="To Date (GMT)"
                            value={this.props.datasetQuery.endDate}
                            onChange={this.handleEndDateChange}
                            renderInput={(params) => <TextField
                                size={'small'}
                                sx={{ 'minWidth': '155px', 'maxWidth': '155px' }} {...params} helperText={null} />}
                        />
                        <MultipleSelectTextField
                            suggestions={this.makeFieldSuggestions()}
                            onChange={this.handleFieldChange}
                            isMulti={false}
                            closeMenuOnSelect={true}
                            placeholder={'Select Search Category'}
                            width='300px'
                            size={"small"} selectedItems={this.props.datasetQuery.metadatafields}  ></MultipleSelectTextField>
                        <TextField
                            id={'lucene-search'}
                            key={'lucene-search'}
                            label={'Search...'}
                            variant={"outlined"}
                            value={this.props.datasetQuery.searchExpr || ''}
                            onChange={this.handleSearchExprChange}
                            onKeyPress={this.handleSearchExpKeyPressed}
                            sx={{ 'width': 800 }}
                            size={'small'}
                        />
                        <MultipleSelectTextField
                            suggestions={this.getProductGroups()}
                            onChange={this.handleProductGroupsChange}
                            selectedItems={this.getSelectedProducts()}
                            isMulti={true}
                            closeMenuOnSelect={true}
                            placeholder={'Select Product Group(s)'}
                            width={'300px'}
                            size={'small'}
                        />
                        <MultipleSelectTextField
                            suggestions={this.makeProductSuggestions()}
                            onChange={this.handleUpdateProducts}
                            selectedItems={this.props.datasetQuery.productNames}
                            isMulti={true}
                            placeholder={'Select Product(s)'}
                            closeMenuOnSelect={false}
                            width={'300px'}
                            size={"small"}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={8} md={12}>
                    <Stack direction={'row'} alignItems="center">
                        <Button variant="contained"
                            color="secondary"
                            onClick={this.handleSearchDatasets}>
                            Search&nbsp;
                            {this.props.loading && <CircularProgress size={24} />}
                            <Icon>search</Icon>
                        </Button>
                        <IconButton
                            onClick={this.props.openHelpDialog}
                        >
                            <Icon color={"secondary"}>
                                help
                            </Icon>
                        </IconButton>
                        <Button onClick={this.props.openAdvancedSearchDialog} size={'small'}>
                            Advanced Options
                        </Button>
                        <Button onClick={this.handleClear} size={'small'}>
                            Clear
                        </Button>
                        <Button onClick={this.props.openSaveSearchDialog} size={'small'}>
                            Save Search
                        </Button>
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
                            title={'Title of Search to be Saved'}
                            value={this.props.saveSearchTitle}
                            onSave={this.handleSaveFilter}
                            onChange={this.handleUpdateSaveSearchTitle}
                        />
                        <AdvancedSearchDialog
                            open={this.props.advancedSearchDialogOpen}
                            onClose={this.props.closeAdvancedSearchDialog}
                            datasetQuery={this.props.datasetQuery}
                            updateDatasetQuery={this.props.updateDatasetQuery}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <AdvancedSearchLog
                        datasetQuery={this.props.datasetQuery}
                        updateDatasetQuery={this.props.updateDatasetQuery}
                    />
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
                {this.alertState && (
                        <ShowAlertMessage
                            open={this.alertState}
                            message= {this.message}
                            onClose={this.closeAlert}
                        />
                    )}
            </Grid>
        );
    }
}

export default SearchPanel;
