import * as React from "react";
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import createStyles from "@material-ui/core/styles/createStyles";
import { Tooltip, WithStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Icon from "@material-ui/core/Icon/Icon";
import { SubmissionFile } from "../../model";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { blue, green, orange, red } from "@material-ui/core/colors";
import { Submission } from "../../model/Submission";


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


export interface SubmissionFilesTableProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    submissionValue: Submission;

    onSubmissionFileSelectClick: (submissionFile: SubmissionFile) => void;
    onSubmissionFileDeleteClick: (submissionFile: SubmissionFile) => void;
    onSubmissionFileUploadClick: (submissionFile: SubmissionFile) => void;
    onSubmissionFileDownloadClick: (submissionFile: SubmissionFile) => void;
}


class SubmissionFilesTable extends React.Component<SubmissionFilesTableProps> {
    constructor(props: SubmissionFilesTableProps) {
        super(props);
    }

    getColoutForStatus = (status: string) => {
        switch (status) {
            case 'VALIDATED':
                return green.A400;
            case 'WARNING':
                return orange.A400;
            case 'ERROR':
                return red.A400;
            case 'SUBMITTED':
                return blue.A400;
        }
        return "yellow"
    };

    handleUploadNewSubmissionClick = (fileType: string) => {
        const submissionFile = {
            index: -1,
            submission_id: this.props.submissionValue.submission_id,
            filename: "",
            status: "",
            filetype: fileType,
            creationdate: "",
            result: {
                status: "",
                issues: []
            }
        };

        this.props.onSubmissionFileUploadClick(submissionFile);
    };

    render() {
        if (!this.props.open) {
            return null;
        }

        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <Grid container justify={"flex-end"}>
                    <Button
                        color={"primary"}
                        onClick={this.props.onClose}
                    >
                        Close
                    </Button>
                    <Tooltip title="Add measurement file to submission" aria-label="NewMeasurementUpload">
                        <Button
                            color={"primary"}
                            onClick={() => this.handleUploadNewSubmissionClick("MEASUREMENT")}
                        >
                            Add Measurement
                        </Button>
                    </Tooltip>
                    <Tooltip title="Add document file to submission" aria-label="NewDocumentUpload">
                        <Button
                            color={"primary"}
                            onClick={() => this.handleUploadNewSubmissionClick("DOCUMENT")}
                        >
                            Add Document
                        </Button>
                    </Tooltip>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                        </TableRow>
                        <TableRow>
                            <TableCell>FileName</TableCell>
                            <TableCell>Index</TableCell>
                            <TableCell>File Type</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.submissionValue.files.map((row: SubmissionFile) => {
                            const colour = this.getColoutForStatus(row.status);
                            return (
                                <TableRow key={row.filename}>
                                    <TableCell>
                                        {row.filename}

                                    </TableCell>
                                    <TableCell>
                                        {row.index}
                                    </TableCell>
                                    <TableCell>
                                        {row.filetype}
                                    </TableCell>
                                    <TableCell>
                                        {row.creationdate ? row.creationdate.substr(0, 10) : ""}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            style={{background: colour, color: "white"}}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="List Import Issues" aria-label="ImportIssues">
                                            <Button
                                                onClick={() => this.props.onSubmissionFileSelectClick(
                                                    row
                                                )}
                                                disabled={row.filetype === 'DOCUMENT'}
                                            >
                                                <Icon className={classes.rightIcon}>list</Icon>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Delete File" aria-label="DeleteFile">
                                            <Button
                                                onClick={() => this.props.onSubmissionFileDeleteClick(
                                                    row
                                                )}
                                            >
                                                <Icon className={classes.rightIcon}>delete</Icon>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Re-Upload File" aria-label="ReUpload">
                                            <Button
                                                onClick={() => this.props.onSubmissionFileUploadClick(
                                                    row
                                                )}
                                            >
                                                <Icon className={classes.rightIcon}>cloud_upload</Icon>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Download File" aria-label="Down load">
                                            <Button
                                                onClick={() => this.props.onSubmissionFileDownloadClick(
                                                    row
                                                )}
                                            >
                                                <Icon className={classes.rightIcon}>cloud_download</Icon>
                                            </Button>
                                        </Tooltip>
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


export default withStyles(styles)(SubmissionFilesTable);

