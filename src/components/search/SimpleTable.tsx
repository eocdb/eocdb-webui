import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
        rightIcon: {
        },
    });

let id = 0;

function createData(file: string) {
    id += 1;

    return {id, file, map: 'map', plot: 'plot', archive: 'archive', documents: 'documents'};
}

const data = [
    createData('OSU/S_Ocean/2K/drf23683.dat'),
    createData('OSU/S_Ocean/2K/drf23684.dat'),
    createData('OSU/S_Ocean/2K/drf23684.dat'),
];

interface SimpleTableProps extends WithStyles<typeof styles> {
}

function SimpleTable(props: SimpleTableProps) {
    const {classes} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>File</TableCell>
                        <TableCell>Map</TableCell>
                        <TableCell>Plot</TableCell>
                        <TableCell>Archive</TableCell>
                        <TableCell>Documents</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => {
                        return (
                            <TableRow key={n.id}>
                                <TableCell component="th" scope="row">
                                    {n.file}
                                </TableCell>
                                <TableCell>
                                    <Button><Icon className={classes.rightIcon}>language</Icon></Button>
                                </TableCell>
                                <TableCell>
                                    <Button><Icon className={classes.rightIcon}>bar_chart</Icon></Button>
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
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(SimpleTable);