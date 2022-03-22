import * as React from 'react';
import { Dataset, DatasetRef, QueryResult } from "../../model";
import MetaInfoDialog from "./MetaInfoDialog";
import { PlotRecord, PlotState } from "../../states/dataTableState";
import PlotDialog from "./PlotDialog";
import { geoJSON, LatLng, LatLngBounds } from "leaflet";
import { TermsDialog } from "./TermsDialog";
import {
    IconButton,
    Paper,
    Button,
    Icon,
    CircularProgress,
    Checkbox,
    FormControlLabel,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    TableFooter,
    TablePagination, useTheme, Box, Stack
} from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@mui/icons-material";


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
        const last = Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1);
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
    rowsPerPage: number;

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


export default function DataTable(props: DataTableProps) {
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        props.updateDataPage(page);
        props.searchDatasets();
        props.startLoading();
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        props.updateDataRowsPerPage(value);
        props.startLoading();
        props.searchDatasets();
    };

    const handleMetaInfoOpen = (id: string) => {
        props.openMetaInfoDialog();
        props.updateDataset(id);
    };

    const handleMetaInfoClose = () => {
        props.closeMetaInfoDialog();
    };

    const handlePlotOpen = (id: string) => {
        props.updateDataset(id);
        props.openPlotDialog();
    };

    const handlePlotClose = () => {
        props.closePlotDialog();
    };

    const handleDownloadSingleClick = (id: string) => {
        props.updateDataset(id);
        props.openTermsSingleDialog();
    };

    const getBoundsFromSelectedDatasets = (selectedDatasets: string[]) => {
        let bounds = new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0));

        for (let feat of selectedDatasets) {
            let feat_str = props.data.locations[feat];
            feat_str = feat_str.replace(new RegExp("'", 'g'), '"');

            bounds.extend(geoJSON(JSON.parse(feat_str)).getBounds());
        }

        return bounds;
    };

    const handleOnSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectedDatasets: string[] = [];

        if (event.target.checked) {
            selectedDatasets = props.data.datasets.map((row: DatasetRef) => {
                return row.id;
            });

            const bounds = getBoundsFromSelectedDatasets(selectedDatasets);

            props.updateSelectedDatasets(selectedDatasets, bounds);
        } else {
            props.updateSelectedDatasets([], undefined);
        }
    };

    const handleUpdateDownloadDocs = (event: React.ChangeEvent<HTMLInputElement>) => {
        let checked = event.target.checked;
        props.updateDownloadDocs(checked);
    };


    const handleClick = (id: string, selected: string[]) => {
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

        props.updateSelectedDatasets(newSelected,
            new LatLngBounds(new LatLng(0, 0), new LatLng(0, 0))
        );
    };

    const isSelected = (id: string) => {
        return props.selectedDatasets.indexOf(id) !== -1;
    };

    const handleDownloadClick = () => {
        props.startDownloading();
        props.downloadDatasets();
        props.closeTermsDialog();
    };

    const handleTermsDialogAgreeClick = () => {
        props.downloadDataset(props.dataset.id);
        props.closeTermsSingleDialog();
    };


    const {data, rowsPerPage, page, selectedDatasets} = props;
    const {datasets, total_count} = data;
    const numSelected = selectedDatasets.length;

    return (
        <Paper>
            <MetaInfoDialog
                open={props.metaInfoDialogOpen}
                handleClose={handleMetaInfoClose}
                dataset={props.dataset}

                helpDialogOpen={props.helpMetaInfoDialogOpen}
                closeHelpDialog={props.closeHelpMetaInfoDialog}
                openHelpDialog={props.openHelpMetaInfoDialog}
                helpMetaInfoKey={props.helpMetaInfoKey}
            />
            <PlotDialog
                open={props.plotDialogOpen}
                onClose={handlePlotClose}
                dataset={props.dataset}
                plotState={props.plotState}
                updatePlotState={props.updatePlotState}
                plotData={props.plotData}
                updatePlotData={props.updatePlotData}
            />
            <TermsDialog
                title={'OCDB Download Terms and Conditions'}
                open={props.termsDialogOpen}
                onDisagree={props.closeTermsDialog}
                onAgree={handleDownloadClick}
            />
            <TermsDialog
                title={'OCDB Download Terms and Conditions'}
                open={props.termsSingleDialogOpen}
                onDisagree={props.closeTermsSingleDialog}
                onAgree={handleTermsDialogAgreeClick}
            />
            <Stack spacing={2} direction={'row'}>
                <Button variant={"contained"}
                        color={"primary"}
                        key={"btn_download33"}
                        disabled={numSelected == 0}
                        onClick={() => props.openTermsDialog()}
                >
                    Download
                    <Icon>archive</Icon>
                    {props.downloading && <CircularProgress size={24}/>}
                </Button>
                <FormControlLabel
                    control={
                        <Checkbox
                            value={'docs'}
                            disabled={numSelected == 0}
                        />
                    }
                    label="Include Documents"
                    onChange={handleUpdateDownloadDocs}
                />
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowsPerPage}
                                checked={numSelected === rowsPerPage}
                                onChange={handleOnSelectAllClick}
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
                                aria-checked={isSelected(row.id)}
                                tabIndex={-1}
                                selected={isSelected(row.id)}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isSelected(row.id)}
                                        value={row.id}
                                        onClick={() => handleClick(row.id, selectedDatasets)}
                                    />
                                </TableCell>
                                <TableCell style={{cursor: 'pointer'}}
                                           onClick={() => handleDownloadSingleClick(row.id)}
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
                                        onClick={() => handleMetaInfoOpen(row.id)}
                                    >
                                        <Icon>list</Icon>
                                    </IconButton>
                                    <Button
                                        color={"inherit"}
                                        onClick={() => handlePlotOpen(row.id)}
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
                                    rowsPerPageOptions={[5, 10, 25, 100, 200, 500]}
                                    component="div"
                                    count={total_count}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
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
