import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Table from "@material-ui/core/Table/Table";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import { CloudUpload } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import { Submission } from "../../api/getSubmissionsForUser";
import Icon from '@material-ui/core/Icon/Icon';
import { User } from "../../types/user";
import Chip from "@material-ui/core/Chip";
import SubmissionFilesDialog from "../../containers/submit/SubmissionFilesDialog";
import { SubmissionFile } from "../../api/getSubmissionFilesForSubmission";


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
            fontcolor: "black"
        },
    });


interface SubmissionTableProps extends WithStyles<typeof styles> {
    show: boolean;
    openSubmitSteps: () => void;

    submissionFilesDialogOpen: boolean;
    openSubmissionFilesDialog: () => void;
    closeSubmissionFilesDialog: () => void;

    updateCurrentSubmission: (currentSubmissionId: string, currentSubmissionFiles: SubmissionFile[]) => void;
    currentSubmissionId: string;
    currentSubmissionFiles: SubmissionFile[];

    submissions: Submission[];
    user?: User | null;
}


class SubmissionTable extends React.PureComponent<SubmissionTableProps> {
    constructor(props: SubmissionTableProps) {
        super(props);
    }

    handleOpenSubmitSteps = () => {
        this.props.openSubmitSteps();
    };

    handleOpenSubmissionFilesDialog = (currentSubmissionId: string, currentSubmissionFiles: SubmissionFile[]) => {
        this.props.openSubmissionFilesDialog();
        this.props.updateCurrentSubmission(currentSubmissionId, currentSubmissionFiles);
    };

    getColoutForStatus = (status: string) => {
        switch (status) {
            case 'SUBMITTED':
                return "orange";
            case 'VALIDATED':
                return "red";
            case 'APPROVED':
                return "green";
        }
        return "yellow"
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes, submissions} = this.props;

        return (
            <Paper className={classes.root}>
                <SubmissionFilesDialog
                    key={this.props.currentSubmissionId}
                    submissionId={this.props.currentSubmissionId}
                    submissionFiles={this.props.currentSubmissionFiles}
                    onClose={this.props.closeSubmissionFilesDialog}
                    open={this.props.submissionFilesDialogOpen}
                />
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
                            <TableCell>SubmissionId</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissions.map((row: Submission) => {
                            const colour = this.getColoutForStatus(row.status);

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    key={row.submission_id}
                                    tabIndex={-1}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.submission_id}
                                    </TableCell>
                                    <TableCell>
                                        {row.date}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            style={{background: colour}}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => this.handleOpenSubmissionFilesDialog(
                                                row.submission_id,
                                                row.file_refs
                                            )}
                                        >
                                            <Icon className={classes.rightIcon}>bar_chart</Icon>
                                        </Button>
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