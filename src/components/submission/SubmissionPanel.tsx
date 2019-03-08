import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import SubmissionTable from "./SubmissionTable";
import { Submission } from 'src/model';
import { SubmissionFile } from "../../model/SubmissionFile";
import SubmissionFilesTable from "./SubmissionFilesTable";
import SubmissionDialog from "./SubmissionDialog";
import SubmissionIssueDialog from "./SubmissionIssueDialog";
import YesNoAlert from "./YesNoAlert";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {},
});


interface SubmissionPanelProps extends WithStyles<typeof styles> {
    show: boolean;

    submissionDialogOpen: boolean;
    openSubmissionDialog: () => void,
    closeSubmissionDialog: () => void,

    submissionFilesTableOpen: boolean;
    openSubmissionFilesTable: () => void,
    closeSubmissionFilesTable: () => void,


    submissionFileIssueDialogOpen: boolean;
    openSubmissionFileIssueDialog: () => void,
    closeSubmissionFileIssueDialog: () => void,

    deleteSubmissionFileAlertOpen: boolean;
    openDeleteSubmissionFileAlert: () => void;
    closeDeleteSubmissionFileAlert: () => void;

    submissionsForUser: Submission[];
    updateSubmissionsForUser: () => void;

    selectedSubmission: Submission;
    updateSelectedSubmission: (selectedSubmissionId: string) => void;

    selectedSubmissionFile: SubmissionFile;
    updateSelectedSubmissionFile: (selectedSubmissionId: string, selectedSubmissionFileIndex: number) => void;

    setSubmissionStatus: (submissionId: string, status: string) => void;

    deleteSubmissionFile: (submissionId: string, submissionFileIndex: number) => void;

    // SubmissionDialog

    updateSubmissionId: (submissionId: string) => void;
    selectedSubmissionId: string;

    updatePath: (path: string) => void;
    selectedPath: string;

    updateDataFiles: (acceptedFiles: File[]) => void;
    selectedDataFiles: File[];

    updateDocFiles: (acceptedFiles: File[]) => void;
    selectedDocFiles: File[];

    sendSubmission: () => void;

    clearSubmissionForm: () => void;
}


class SubmissionPanel extends React.PureComponent<SubmissionPanelProps> {
    constructor(props: SubmissionPanelProps) {
        super(props);
    }

    handleApproveSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'APPROVED');
        this.props.updateSubmissionsForUser();
    };

    handleRejectSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'REJECTED');
        this.props.updateSubmissionsForUser();
    };

    handleHaltSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'HALTED');
        this.props.updateSubmissionsForUser();
    };

    handleRestartSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'SUBMITTED');
        this.props.updateSubmissionsForUser();
    };

    handleSendSubmission = () => {
        this.props.sendSubmission();
        this.props.updateSubmissionsForUser();
    };

    handleUpdateSubmission = (submissionId: string) => {
        this.props.updateSelectedSubmission(submissionId);
        this.props.openSubmissionFilesTable();
    };

    handleSubmissionFileSelect = (submissionId: string, submissionFileIndex: number) => {
        this.props.updateSelectedSubmissionFile(submissionId, submissionFileIndex);
        this.props.openSubmissionFileIssueDialog();
    };

    handleDeleteSubmissionFile = (submissionId: string, submissionFileIndex: number) => {
        this.props.openDeleteSubmissionFileAlert();
        // this.props.deleteSubmissionFile(submissionId, submissionFileIndex);
        // this.props.updateSelectedSubmission(submissionId);
        // this.props.openSubmissionFilesTable();
    };

    handleDeleteSubmissionFileAlertAgree = () => {
        this.props.closeDeleteSubmissionFileAlert();
        // this.props.deleteSubmissionFile(submissionId, submissionFileIndex);
        // this.props.updateSelectedSubmission(submissionId);
        // this.props.openSubmissionFilesTable();
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className={this.props.classes.root}>
                <SubmissionDialog
                    show={this.props.submissionDialogOpen}
                    onClose={this.props.closeSubmissionDialog}

                    onSubmissionIdChange={this.props.updateSubmissionId}
                    submissionIdValue={this.props.selectedSubmissionId}

                    onPathChange={this.props.updatePath}
                    pathValue={this.props.selectedPath}

                    onDatafilesChange={this.props.updateDataFiles}
                    dataFilesValue={this.props.selectedDataFiles}

                    onDocfilesChange={this.props.updateDocFiles}
                    docFilesValue={this.props.selectedDocFiles}

                    onFileSubmit={this.handleSendSubmission}

                    onClearForm={this.props.clearSubmissionForm}
                />
                <SubmissionTable
                    show={!this.props.submissionDialogOpen}

                    submissionsValue={this.props.submissionsForUser}

                    onSubmissionSelect={this.handleUpdateSubmission}

                    onSubmissionApprove={this.handleApproveSubmission}
                    onSubmissionReject={this.handleRejectSubmission}
                    onSubmissionHalt={this.handleHaltSubmission}
                    onSubmissionRestart={this.handleRestartSubmission}

                    onSubmissionDialogOpen={this.props.openSubmissionDialog}
                />
                <SubmissionFilesTable
                    onClose={this.props.closeSubmissionFilesTable}
                    open={this.props.submissionFilesTableOpen}

                    submissionValue={this.props.selectedSubmission}

                    onSubmissionFileDelete={this.handleDeleteSubmissionFile}
                    onSubmissionFileSelect={this.handleSubmissionFileSelect}
                />
                <SubmissionIssueDialog
                    onClose={this.props.closeSubmissionFileIssueDialog}
                    open={this.props.submissionFileIssueDialogOpen}

                    submissionFileValue={this.props.selectedSubmissionFile}
                />
                <YesNoAlert
                    open={this.props.deleteSubmissionFileAlertOpen}
                    onClose={this.props.closeDeleteSubmissionFileAlert}
                    onAgree={this.handleDeleteSubmissionFileAlertAgree}
                >
                    Do you really want to delete?
                </YesNoAlert>
            </div>
        );
    }
}

export default withStyles(styles)(SubmissionPanel);
