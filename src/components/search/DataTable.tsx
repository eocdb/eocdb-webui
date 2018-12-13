import * as React from 'react';
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
import { KeyboardArrowLeft, KeyboardArrowRight, Settings, BarChart } from "@material-ui/icons";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import {Dataset, QueryResult} from "../../types/dataset";
import MetaInfoDialog from "./MetaInfoDialog";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";


const actionsStyles = (theme: Theme) => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});


interface TablePaginationActionsProps extends WithStyles<typeof actionsStyles>, WithTheme {
    count: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void;
    page: number;
    rowsPerPage: number;
}

class TablePaginationActions extends React.Component<TablePaginationActionsProps> {
    handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('First');
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Back');
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Next');
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Last');
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
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
            minWidth: 700,
        },
        rightIcon: {},
    });


interface DataTableProps extends WithStyles<typeof styles> {
    data: QueryResult;
    page: number;
    rowsPerPage: number;
    searchDatasets: () => void;
    updateDataPage: (page: number) => void;
    updateDataRowsPerPage: (rowsPerPage: number) => void;

    metaInfoDialogOpen: boolean;
    openMetaInfoDialog: () => void;
    closeMetaInfoDialog: () => void;

    plotDialogOpen: boolean;
    openPlotDialog: () => void;
    closePlotDialog: () => void;

    updateDataset: (datasetId: string) => void;
    dataset: Dataset;
}


class DataTable extends React.Component<DataTableProps> {
    constructor(props: DataTableProps) {
        super(props);
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        console.log(page);
        console.log(event);
        this.props.updateDataPage(page);
        this.props.searchDatasets();
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        this.props.updateDataRowsPerPage(value);
        this.props.searchDatasets();
    };

    handleMetaInfoOpen = (id: string) => {
        console.log(id);
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

    render() {
        const {classes, data, rowsPerPage, page} = this.props;
        const {datasets, total_count} = data;

        return (
            <Paper className={classes.root}>
                <MetaInfoDialog
                    open={this.props.metaInfoDialogOpen}
                    handleClose={this.handleMetaInfoClose}
                    dataset={this.props.dataset}
                />
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox checked={true} />
                            </TableCell>
                            <TableCell>File</TableCell>
                            <TableCell>Info</TableCell>
                            <TableCell>Plot</TableCell>
                            <TableCell>Archive</TableCell>
                            <TableCell>Documents</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datasets.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={true} />
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {row.path}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="inherit"
                                            onClick={() => this.handleMetaInfoOpen(row.id)}
                                        >
                                            <Settings/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="inherit"
                                        >
                                            <BarChart/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <Button><Icon className={classes.rightIcon}>archive</Icon></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button><Icon className={classes.rightIcon}>cloud_download</Icon></Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
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
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(DataTable);