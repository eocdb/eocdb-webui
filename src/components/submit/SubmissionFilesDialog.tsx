import * as React from "react";
import {Theme, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide, {SlideProps} from '@material-ui/core/Slide';

import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Icon from "@material-ui/core/Icon/Icon";
import SubmissionIssueDialog from "./SubmissionIssueDialog";
import {SubmissionFile} from "../../api/getSubmissionFilesForSubmission";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    searchField: {
        width: 300,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});


function Transition(props: SlideProps) {
    return <Slide direction="up" {...props} />;
}


export interface SubmissionfilesDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    submissionId: string;
    submissionFiles: SubmissionFile[];
}


class SubmissionFilesDialog extends React.Component<SubmissionfilesDialogProps> {
    constructor(props: SubmissionfilesDialogProps) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.onClose}
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="form-dialog-title">Submission Files for {this.props.submissionId}</DialogTitle>
                    <Paper className={classes.root}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>SubmissionId</TableCell>
                                    <TableCell>FileName</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.submissionFiles.map((row: SubmissionFile) => {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                {row.submissionId}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={this.props.openSubmisssionIssuesDialog}
                                                >
                                                    <Icon className={classes.rightIcon}>bar_chart</Icon>
                                                </Button>
                                                <SubmissionIssueDialog
                                                    submissionId={row.submission_id}
                                                    onClose={this.props.closeSubmisssionIssuesDialog}
                                                    open={this.props.submisssionIssuesDialogOpen}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </Paper>
                <DialogActions className={classes.appBar}>
                    <Button onClick={this.props.onClose}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            < / div >
        );
    }
}


export default withStyles(styles)(SubmissionFilesDialog);

