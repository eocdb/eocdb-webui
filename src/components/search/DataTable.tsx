import * as React from 'react';

const path = require('path');

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
import { KeyboardArrowLeft, KeyboardArrowRight, Settings } from "@material-ui/icons";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import { Dataset, QueryResult } from "../../types/dataset";
import MetaInfoDialog from "./MetaInfoDialog";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";


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
        const last = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 2);
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

    updateDataset: (datasetId: string) => void;
    dataset: Dataset;

    downloadDocs: boolean;
    updateDownloadDocs: (downloadDocs: boolean) => void;
}

interface DataTableState {
    selected: string[];
}

class DataTable extends React.Component<DataTableProps, DataTableState> {
    constructor(props: DataTableProps) {
        super(props);

        this.state = {
            selected: [],
        };
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        this.props.updateDataPage(page);
        this.props.searchDatasets();
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        this.props.updateDataRowsPerPage(value);
        this.props.searchDatasets();
    };

    handleMetaInfoOpen = (id: string) => {
        this.props.openMetaInfoDialog();
        this.props.updateDataset(id);
    };

    handleMetaInfoClose = () => {
        this.props.closeMetaInfoDialog();
    };

    handleOnSelectAllClick = () => {

    };

    handleUpdateDownloadDocs(event: React.ChangeEvent<HTMLInputElement>) {
        let checked = event.target.checked;
        console.log(checked);
        if (this.props) {
            this.props.updateDownloadDocs(checked);
        }
    }

    isSelected = (id: string) => {
        console.log('test');
        return this.state.selected.indexOf(id) !== -1;
    };

    render() {
        const {classes, data, rowsPerPage, page} = this.props;
        const {datasets, total_count} = data;
        const numSelected = 1;
        const hrefStyle: React.CSSProperties = {color: 'black', textDecoration: "none"};

        return (
            <Paper className={classes.root}>
                <MetaInfoDialog
                    open={this.props.metaInfoDialogOpen}
                    handleClose={this.handleMetaInfoClose}
                    dataset={this.props.dataset}
                />
                <Grid container justify={"flex-end"}>
                    <Button variant={"contained"}
                            color={"secondary"}
                            key={"btn_download33"}
                            className={classes.button}
                            disabled={total_count == 0}
                    >
                        Download
                        <Icon className={classes.rightIcon}>archive</Icon>
                    </Button>
                    <FormControlLabel
                        className={classes.button}
                        control={
                            <Checkbox
                                value={'docs'}
                                disabled={total_count == 0}
                            />
                        }
                        label="Include Docs"
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
                            <TableCell>Tools</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datasets.map(row => {
                            const isSelected = false;

                            const fileName = path.basename(row.path);
                            const dirName = path.dirname(row.path);
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    key={row.id}
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox/>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="button" gutterBottom>
                                            <a
                                                href={"https://seabass.gsfc.nasa.gov/archive_preview/AWI/PANGAEA/ANT-XVIII-2/archive/ANT-XVIII_2_pigments.sb"}
                                                //href={"http://10.2.0.57:4000/eocdb/api/v0.1.0/store/download?expr=path%3A%20*" + fileName +  "*"}
                                                download={fileName + '.zip'}
                                                style={hrefStyle}
                                            >
                                                {fileName}
                                            </a>
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
                                            <Settings/>
                                        </IconButton>
                                        <Button><Icon className={classes.rightIcon}>bar_chart</Icon></Button>
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