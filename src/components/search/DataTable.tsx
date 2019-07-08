import * as React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles, WithTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button/Button';
import Icon from '@material-ui/core/Icon/Icon';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import { Dataset, DatasetRef, QueryResult } from "../../model";
import MetaInfoDialog from "./MetaInfoDialog";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import green from "@material-ui/core/colors/green";
import { PlotRecord, PlotState } from "../../states/dataTableState";
import PlotDialog from "./PlotDialog";
import { geoJSON, LatLng, LatLngBounds } from "leaflet";
import { TermsDialog } from "./TermsDialog";


const path = require('path');


const actionsStyles = (theme: Theme) => createStyles({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    }
});


interface TablePaginationActionsProps extends WithStyles<typeof actionsStyles>, WithTheme {
    count: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void;
    page: number;
    rowsPerPage: number;
}


class TablePaginationActions extends React.Component<TablePaginationActionsProps> {
    constructor(props: TablePaginationActionsProps) {
        super(props);
    }

    handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const last = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
        this.props.onChangePage(event, last);
    };

    render() {
        const {classes, count, page, rowsPerPage, theme} = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                </IconButton>
            </div>
        );
    }
}


const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
    TablePaginationActions,
);


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 100,
        },
        rightIcon: {},
        button: {
            margin: theme.spacing.unit / 2,
        },
        link: {
            fontcolor: 'black'
        },
        downloadContainer: {
            width: '100%',
            border: '1px solid red',
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    });


export interface DataTableProps extends WithStyles<typeof styles> {
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


class DataTable extends React.Component<DataTableProps> {
    constructor(props: DataTableProps) {
        super(props);
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
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
        this.props.openPlotDialog();
        this.props.updateDataset(id);
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
        const {classes, data, rowsPerPage, page, selectedDatasets} = this.props;
        const {datasets, total_count} = data;
        const numSelected = selectedDatasets.length;

        return (
            <Paper className={classes.root}>
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
                <Grid container justify={"flex-end"}>
                    <Button variant={"contained"}
                            color={"primary"}
                            key={"btn_download33"}
                            className={classes.button}
                            disabled={numSelected == 0}
                            onClick={() => this.props.openTermsDialog()}
                    >
                        Download
                        <Icon className={classes.rightIcon}>archive</Icon>
                        {this.props.downloading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                    </Button>
                    <FormControlLabel
                        className={classes.button}
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
                <Table className={classes.table}>
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
                            const fileName = path.basename(row.path);
                            const dirName = path.dirname(row.path);

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
                                            <Icon className={classes.rightIcon}>list</Icon>
                                        </IconButton>
                                        <Button
                                            color={"inherit"}
                                            onClick={() => this.handlePlotOpen(row.id)}
                                        >
                                            <Icon className={classes.rightIcon}>bar_chart</Icon>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {datasets.length > 0 ? (
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={total_count}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActionsWrapped}
                                    />
                                ) :
                                <TableCell>
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

export default withStyles(styles)(DataTable);