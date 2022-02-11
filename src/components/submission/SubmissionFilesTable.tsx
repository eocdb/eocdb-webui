import * as React from "react";
import { Submission, SubmissionFile, User } from "../../model";
import { green, orange, red, blue } from "@mui/material/colors";
import { Button, Paper, Grid, Table, TableHead, TableRow, TableCell, Chip, Icon, Tooltip, TableBody } from "@mui/material";


export interface SubmissionFilesTableProps {
    open: boolean;
    onClose: () => void;

    submissionValue: Submission;

    onSubmissionFileSelectClick: (submissionFile: SubmissionFile) => void;
    onSubmissionFileDeleteClick: (submissionFile: SubmissionFile) => void;
    onSubmissionFileUploadClick: (submissionFile: SubmissionFile) => void;
    onSubmissionFileDownloadClick: (submissionFile: SubmissionFile) => void;

    user: User | null;
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

        const {user} = this.props;

        const isAdmin = user && (user.roles.indexOf('admin') > -1);

        return (
            <Paper>
                <Grid container>
                    <Button
                        color={"primary"}
                        onClick={this.props.onClose}
                    >
                        Close
                    </Button>
                    <Tooltip title="Add measurement file to submission" placement={"top"}>
                        <Button
                            color={"primary"}
                            onClick={() => this.handleUploadNewSubmissionClick("MEASUREMENT")}
                        >
                            Add Measurement
                        </Button>
                    </Tooltip>
                    <Tooltip title="Add document file to submission" placement={"top"}>
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
                                        <Tooltip title="List Import Issues" placement={"top"}>
                                            <Button
                                                onClick={() => this.props.onSubmissionFileSelectClick(
                                                    row
                                                )}
                                                disabled={row.filetype === 'DOCUMENT'}
                                            >
                                                <Icon>list</Icon>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Delete File" placement={"top"}>
                                            <Button
                                                onClick={() => this.props.onSubmissionFileDeleteClick(
                                                    row
                                                )}
                                                disabled={!isAdmin}
                                            >
                                                <Icon>delete</Icon>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Re-Upload File" placement={"top"}>
                                            <Button
                                                onClick={() => this.props.onSubmissionFileUploadClick(
                                                    row
                                                )}
                                            >
                                                <Icon>cloud_upload</Icon>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Download File" placement={"top"}>
                                            <Button
                                                onClick={() => this.props.onSubmissionFileDownloadClick(
                                                    row
                                                )}
                                            >
                                                <Icon>cloud_download</Icon>
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


export default SubmissionFilesTable;

