import * as React from 'react';
import { Dataset, DatasetQuery, DatasetRef, QueryResult } from "../../model";
import MetaInfoDialog from "./MetaInfoDialog";
import { PlotRecord, PlotState } from "../../states/dataTableState";
import PlotDialog from "./PlotDialog";
import { geoJSON, LatLng, LatLngBounds } from "leaflet";
import { TermsDialog } from "./TermsDialog";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    Icon,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme
} from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@mui/icons-material";
import { tot_page } from "../../tools/utils";
import { PG_TYPE } from "../../model/DatasetQuery";


interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}


function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onPageChange(event, props.page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onPageChange(event, props.page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const last = tot_page(props.count, props.rowsPerPage);
        props.onPageChange(event, last);
    };

    const {count, page, rowsPerPage} = props;

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                {theme.direction === 'rtl' ? <LastPage/> : <FirstPage/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                {theme.direction === 'rtl' ? <FirstPage/> : <LastPage/>}
            </IconButton>
        </Box>
    );
}




export interface DataTableProps {
    data: QueryResult;
    page: number;
    prevPage: number;
    rowsPerPage: number;

    datasetQuery: DatasetQuery;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;

    searchDatasets: () => void;
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

    selectedDatasets: string[];
    updateSelectedDatasets: (selectedDatasets: string[], selectedBounds?: LatLngBounds) => void;

    startLoading: () => void;
    startDownloading: () => void;

    downloadDatasets: () => void;
    downloadDataset: (id: string) => void;
    downloading: boolean;

    updatePlotState: (plotState: PlotState) => void;
    plotState: PlotState;

    updatePlotData: (plotData: PlotRecord[]) => void;
    plotData: PlotRecord[];
}


class DataTable extends React.Component<DataTableProps> {
    constructor(props: DataTableProps) {
        super(props);
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        const last_page = tot_page (this.props.data.total_count, this.props.rowsPerPage);

        if (page == 0) {
            // First page
            this.props.updateDatasetQuery ({
                ...this.props.datasetQuery, last_id: null, pgType: PG_TYPE.first
            });
        }
        else if (page == last_page) {
            this.props.updateDatasetQuery ({
                ...this.props.datasetQuery, last_id: null,  pgType:  PG_TYPE.last
            });
        }
        else if (page > this.props.page) {
            const last_entry = this.props.data.datasets.reduce(function(prev, current) {
                return (prev.id > current.id) ? prev : current
            })
            this.props.updateDatasetQuery ({
                ...this.props.datasetQuery, last_id: last_entry.id, pgType: PG_TYPE.next
            });
        }
        else if (page < this.props.page) {
            const last_entry = this.props.data.datasets.reduce(function(prev, current) {
                return (prev.id < current.id) ? prev : current
            })
            this.props.updateDatasetQuery ({
                ...this.props.datasetQuery, last_id: last_entry.id, pgType: PG_TYPE.previous
            });
        }
        else {
            this.props.updateDatasetQuery ({
                ...this.props.datasetQuery, last_id: null, pgType: PG_TYPE.unknown
            });
        }

        this.props.updateDataPage(page);
        this.props.searchDatasets();
        this.props.startLoading();
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        this.props.updateDataRowsPerPage(value);
        this.props.startLoading();
        this.props.searchDatasets();
    };

    handleMetaInfoOpen = (id: string) => {
        this.props.openMetaInfoDialog();
        this.props.updateDataset(id);
    };

    handleMetaInfoClose = () => {
        this.props.closeMetaInfoDialog();
    };

    handlePlotOpen = (id: string) => {
        this.props.updateDataset(id);
        this.props.openPlotDialog();
    };

    handlePlotClose = () => {
        this.props.closePlotDialog();
    };

    handleDownloadSingleClick = (id: string) => {
        this.props.updateDataset(id);
        this.props.openTermsSingleDialog();
    };

    getBoundsFromSelectedDatasets = (selectedDatasets: string[]) => {
        let bounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));

        for (let feat of selectedDatasets) {
            let feat_str = this.props.data.locations[feat];
            feat_str = feat_str.replace(new RegExp("'", 'g'), '"');

            bounds.extend(geoJSON(JSON.parse(feat_str)).getBounds());
        }

        return bounds;
    };

    handleOnSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectedDatasets: string[] = [];

        if (event.target.checked) {
            selectedDatasets = this.props.data.datasets.map((row: DatasetRef) => {
                return row.id;
            });

            const bounds = this.getBoundsFromSelectedDatasets(selectedDatasets);

            this.props.updateSelectedDatasets(selectedDatasets, bounds);
        } else {
            this.props.updateSelectedDatasets([], undefined);
        }
    };

    handleUpdateDownloadDocs = (event: React.ChangeEvent<HTMLInputElement>) => {
        let checked = event.target.checked;
        this.props.updateDownloadDocs(checked);
    };


    handleClick = (id: string, selected: string[]) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.props.updateSelectedDatasets(newSelected,
            new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0))
        );
    };

    isSelected = (id: string) => {
        return this.props.selectedDatasets.indexOf(id) !== -1;
    };

    handleDownloadClick = () => {
        this.props.startDownloading();
        this.props.downloadDatasets();
        this.props.closeTermsDialog();
    };

    handleTermsDialogAgreeClick = () => {
        this.props.downloadDataset(this.props.dataset.id);
        this.props.closeTermsSingleDialog();
    };

    render() {
        const {data, rowsPerPage, page, selectedDatasets} = this.props;
        const {datasets, total_count} = data;
        const numSelected = selectedDatasets.length;

        return (
            <Paper>
                <MetaInfoDialog
                    open={this.props.metaInfoDialogOpen}
                    handleClose={this.handleMetaInfoClose}
                    dataset={this.props.dataset}

                    helpDialogOpen={this.props.helpMetaInfoDialogOpen}
                    closeHelpDialog={this.props.closeHelpMetaInfoDialog}
                    openHelpDialog={this.props.openHelpMetaInfoDialog}
                    helpMetaInfoKey={this.props.helpMetaInfoKey}
                />
                <PlotDialog
                    open={this.props.plotDialogOpen}
                    onClose={this.handlePlotClose}
                    dataset={this.props.dataset}
                    plotState={this.props.plotState}
                    updatePlotState={this.props.updatePlotState}
                    plotData={this.props.plotData}
                    updatePlotData={this.props.updatePlotData}
                />
                <TermsDialog
                    title={'OCDB Download Terms and Conditions'}
                    open={this.props.termsDialogOpen}
                    onDisagree={this.props.closeTermsDialog}
                    onAgree={this.handleDownloadClick}
                />
                <TermsDialog
                    title={'OCDB Download Terms and Conditions'}
                    open={this.props.termsSingleDialogOpen}
                    onDisagree={this.props.closeTermsSingleDialog}
                    onAgree={this.handleTermsDialogAgreeClick}
                />
                <Grid container>
                    <Button variant={"contained"}
                            color={"primary"}
                            key={"btn_download33"}
                            disabled={numSelected == 0}
                            onClick={() => this.props.openTermsDialog()}
                    >
                        Download
                        <Icon>archive</Icon>
                        {this.props.downloading && <CircularProgress size={24}/>}
                    </Button>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={'docs'}
                                disabled={numSelected == 0}
                            />
                        }
                        label="Include Documents"
                        onChange={this.handleUpdateDownloadDocs}
                    />
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowsPerPage}
                                    checked={numSelected === rowsPerPage}
                                    onChange={this.handleOnSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>File</TableCell>
                            <TableCell>Meta/Plots</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datasets.map(row => {
                            const fileName = row.filename;
                            const dirName = row.path;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    key={row.id}
                                    aria-checked={this.isSelected(row.id)}
                                    tabIndex={-1}
                                    selected={this.isSelected(row.id)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={this.isSelected(row.id)}
                                            value={row.id}
                                            onClick={() => this.handleClick(row.id, selectedDatasets)}
                                        />
                                    </TableCell>
                                    <TableCell style={{cursor: 'pointer'}}
                                               onClick={() => this.handleDownloadSingleClick(row.id)}
                                               component="th"
                                               scope="row">
                                        <Typography variant="button" gutterBottom>
                                            {fileName}
                                        </Typography>
                                        <Typography>
                                            {dirName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="inherit"
                                            onClick={() => this.handleMetaInfoOpen(row.id)}
                                        >
                                            <Icon>list</Icon>
                                        </IconButton>
                                        <Button
                                            color={"inherit"}
                                            onClick={() => this.handlePlotOpen(row.id)}
                                        >
                                            <Icon>bar_chart</Icon>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>

                            {datasets.length > 0 ? (
                                <TableCell colSpan={3}>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 100]}
                                        component="div"
                                        count={total_count}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={this.handleChangePage}
                                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                                        sx={{'width': '100%'}}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableCell>
                                ) :
                                <TableCell colSpan={3}>
                                    No Files
                                </TableCell>
                            }
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}

export default DataTable;
