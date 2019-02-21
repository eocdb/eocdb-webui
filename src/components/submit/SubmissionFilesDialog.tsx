import * as React from "react";
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import Dialog from '@material-ui/core/Dialog';
// import Slide, {SlideProps} from '@material-ui/core/Slide';

import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core";
// import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
// import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Icon from "@material-ui/core/Icon/Icon";
import SubmissionIssueDialog from "./SubmissionIssueDialog";
import { SubmissionFile } from "../../api/getSubmissionFilesForSubmission";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";


const styles = (theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing.unit * 2,
    },
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


/*
function Transition(props: SlideProps) {
    return <Slide direction="up" {...props} />;
}
*/


export interface SubmissionFilesDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    submissionId: string;
    submissionFiles: SubmissionFile[];
    submissionIssuesDialogOpen: boolean;
    openSubmissionIssuesDialog: () => void;
    closeSubmissionIssuesDialog: () => void;

    currentSubmissionFile: SubmissionFile;
    updateCurrentSubmissionFile: () => void;

    currentSubmissionFileIndex: number;
    updateCurrentSubmissionFileIndex: (currentSubmissionFileIndex: number) => void;
}


class SubmissionFilesDialog extends React.Component<SubmissionFilesDialogProps> {
    constructor(props: SubmissionFilesDialogProps) {
        super(props);
    }

    getColoutForStatus = (status: string) => {
        switch (status) {
            case 'OK':
                return "green";
            case 'WARNING':
                return "orange";
            case 'ERROR':
                return "red";
            case 'SUBMITTED':
                return "blue";
        }
        return "yellow"
    };


    handleSubmissionFileIssuesDialogOpen = (submissionFileIndex: number) => {
        this.props.updateCurrentSubmissionFileIndex(submissionFileIndex);
        this.props.updateCurrentSubmissionFile();

        this.props.openSubmissionIssuesDialog();
    };

    render() {
        if (!this.props.open) {
            return null;
        }

        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <SubmissionIssueDialog
                    submissionFile={this.props.currentSubmissionFile}
                    onClose={this.props.closeSubmissionIssuesDialog}
                    open={this.props.submissionIssuesDialogOpen}
                />
                <Button
                    onClick={this.props.onClose}
                >
                    Close
                </Button>
                <Typography component={'h2'}>Submission File Status</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>FileName</TableCell>
                            <TableCell>File Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.submissionFiles.map((row: SubmissionFile) => {
                            const colour = this.getColoutForStatus(row.status);
                            console.log(row);
                            return (
                                <TableRow key={row.filename}>
                                    <TableCell>
                                        {row.filename}

                                    </TableCell>
                                    <TableCell>
                                        {row.filetype}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            style={{background: colour, color: "white"}}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => this.handleSubmissionFileIssuesDialogOpen(row.index)}
                                        >
                                            <Icon className={classes.rightIcon}>list</Icon>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}


export default withStyles(styles)(SubmissionFilesDialog);

