import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Table from "@material-ui/core/Table/Table";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Paper from "@material-ui/core/Paper/Paper";
// import Icon from "@material-ui/core/Icon/Icon";
import Button from "@material-ui/core/Button/Button";
import { CloudUpload } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";


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
        button: {
            margin: theme.spacing.unit / 2,
        },
        link: {
            fontcolor: 'black'
        },
    });


interface SubmitTableProps extends WithStyles<typeof styles> {
    openSubmitSteps: () => void,
}


class SubmitTable extends React.PureComponent<SubmitTableProps> {
    constructor(props: SubmitTableProps) {
        super(props);
    }

    handleOpenSubmitSteps = () => {
        this.props.openSubmitSteps();
    };

    render() {
        const classes = this.props.classes;

        return (
            <Paper className={classes.root}>
                <Grid container justify={"flex-end"}>
                    <Button variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={this.handleOpenSubmitSteps}
                    >
                        New Submission
                        <CloudUpload/>
                    </Button>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    //indeterminate={numSelected > 0 && numSelected < rowsPerPage}
                                    //checked={numSelected === rowsPerPage}
                                    //onChange={this.handleOnSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>Upload ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>File(s)</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </Paper>
        );
    }
}


export default withStyles(styles)(SubmitTable);