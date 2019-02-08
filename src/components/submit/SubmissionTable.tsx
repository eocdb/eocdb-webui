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
import Button from "@material-ui/core/Button/Button";
import { CloudUpload } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import { Submission } from "../../api/getSubmissionsForUser";
import Icon from '@material-ui/core/Icon/Icon';



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


interface SubmissionTableProps extends WithStyles<typeof styles> {
    show: boolean;
    openSubmitSteps: () => void;

    submissions: Submission[];
}


class SubmissionTable extends React.PureComponent<SubmissionTableProps> {
    constructor(props: SubmissionTableProps) {
        super(props);
    }

    handleOpenSubmitSteps = () => {
        this.props.openSubmitSteps();
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes, submissions} = this.props;

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
                            <TableCell>SubmissionId</TableCell>
                            <TableCell>File(s)</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissions.map((row: Submission) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    key={row.submissionId}
                                    tabIndex={-1}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.submissionId}
                                    </TableCell>
                                    <TableCell>
                                        {row.date}
                                    </TableCell>
                                    <TableCell>
                                        {row.status}
                                    </TableCell>
                                    <TableCell>
                                        <Button><Icon className={classes.rightIcon}>bar_chart</Icon></Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}


export default withStyles(styles)(SubmissionTable);