import * as React from 'react';
import SubmissionTable from "./SubmissionTable";
import { Submission } from 'src/model';
import { SubmissionFile, User } from "../../model";
import SubmissionFilesTable from "./SubmissionFilesTable";
import SubmissionDialog from "./SubmissionDialog";
import SubmissionIssueDialog from "./SubmissionIssueDialog";
import YesNoAlert from "./YesNoAlert";
import SingleFileUpload from "./SingleFileUpload";
import { SingleUpload } from "../../model/UploadData";
import { MessageLogEntry, MessageType } from "../../states/messageLogState";
import SubmissionMetaDialog from "./SubmissionMetaDialog";
import { SubmissionQuery, SubmissionResult } from "../../model/Submission";


interface SubmissionPanelProps {
    show: boolean;

    submissionDialogOpen: boolean;
    openSubmissionDialog: () => void,
    closeSubmissionDialog: () => void,

    submissionMetaDialogOpen: boolean;
    openSubmissionMetaDialog: () => void,
    closeSubmissionMetaDialog: () => void,

    submissionFilesTableOpen: boolean;
    openSubmissionFilesTable: () => void,
    closeSubmissionFilesTable: () => void,

    submissionFileIssueDialogOpen: boolean;
    openSubmissionFileIssueDialog: () => void,
    closeSubmissionFileIssueDialog: () => void,

    deleteSubmissionFileAlertOpen: boolean;
    openDeleteSubmissionFileAlert: () => void;
    closeDeleteSubmissionFileAlert: () => void;

    deleteSubmissionAlertOpen: boolean;
    openDeleteSubmissionAlert: () => void;
    closeDeleteSubmissionAlert: () => void;

    uploadSubmissionFileDialogOpen: boolean;
    openUploadSubmissionFileDialog: () => void;
    closeUploadSubmissionFileDialog: () => void;

    setSubmissionPublicationDialogOpen: boolean;
    openSubmissionPublicationDateDialog: () => void;
    closeSubmissionPublicationDateDialog: () => void;

    submissionQuery: SubmissionQuery;
    updateSubmissionQuery: (submissionQuery: SubmissionQuery) => void;

    submissionsForUser: SubmissionResult;
    updateSubmissionsForUser: () => void;

    selectedSubmission: Submission;
    updateSelectedSubmission: (selectedSubmissionId: string) => void;

    uploadSubmissionFile: (submissionFile: SubmissionFile, uploadData: SingleUpload) => void;

    deleteSubmission: (submissionId: string) => void;

    selectedSubmissionFile: SubmissionFile;
    getSelectedSubmissionFile: (selectedSubmissionId: string, selectedSubmissionFileIndex: number) => void;
    updateSelectedSubmissionFile: (selectedSubmissionFile: SubmissionFile) => void;

    setSubmissionStatus: (submissionId: string, status: string, appDate?: string | null) => void;

    deleteSubmissionFile: (submissionId: string, submissionFileIndex: number) => void;

    downloadSubmissionFile: (submissionId: string, submissionFileIndex: number) => void;

    submissionPublicationDate: string | null;

    updateSelectedSubmissionPublicationDate: (publicationDate: string | null) => void;

    // SubmissionDialog

    updateSubmissionId: (submissionId: string) => void;
    selectedSubmissionId: string;

    updatePath: (path: string) => void;
    selectedPath: string;

    updateDataFiles: (acceptedFiles: File[]) => void;
    selectedDataFiles: File[];

    updateDocFiles: (acceptedFiles: File[]) => void;
    selectedDocFiles: File[];

    updatePublicationDate: (publicationDate: string | null) => void;
    selectedPublicationDate: string | null;

    updateAllowPublication: (allowPublication: boolean) => void;
    allowPublication: boolean;

    sendSubmission: () => void;
    updateSubmissionMeta: () => void;
    updateSubmissionMessages: (messages: MessageLogEntry[]) => void;
    submissionMessages: MessageLogEntry[];
    hideSubmissionMessages: (id: number) => void;

    clearSubmissionForm: () => void;

    helpDialogOpen: boolean;
    openHelpDialog: () => void;
    closeHelpDialog: () => void;

    submissionSucceeded: boolean;
    user: User | null;
}


class SubmissionPanel extends React.PureComponent<SubmissionPanelProps> {
    constructor(props: SubmissionPanelProps) {
        super(props);
    }

    handleOpenSubmissionDialog = () => {
        this.props.openSubmissionDialog();
    };

    handleOpenSubmissionMetaDialog = (submissionId: string) => {
        this.props.updateSelectedSubmission(submissionId);
        this.props.openSubmissionMetaDialog();
    };

    handleApproveSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'APPROVED');
    };

    handleCancelSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'CANCELED');
    };

    handleHaltSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'PAUSED');
    };

    handleRestartSubmission = (selectedSubmission: Submission) => {
        let ok = true;
        for (let file of selectedSubmission.file_refs) {
            if (file.status === "ERROR") {
                ok = false;
            }
        }

        if (ok) {
            this.props.setSubmissionStatus(selectedSubmission.submission_id, 'VALIDATED');
        } else {
            this.props.setSubmissionStatus(selectedSubmission.submission_id, 'SUBMITTED');
        }
    };


    handleSubmissionPublicationDateClick = (submissionId: string) => {
        this.props.updateSelectedSubmission(submissionId);
        this.props.openSubmissionPublicationDateDialog();
    };

    handleSaveSubmissionPublicationDialog = (selectedSubmission: Submission, publicationDate: string | null) => {
        this.props.closeSubmissionPublicationDateDialog();
        this.props.setSubmissionStatus(selectedSubmission.submission_id, 'READY', publicationDate);
    };

    handlePublishSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'PUBLISHED');
    };

    handleSubmitSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'SUBMIT');
    };

    handleProcessSubmission = (selectedSubmissionId: string) => {
        this.props.setSubmissionStatus(selectedSubmissionId, 'PROCESSED');
    };

    handleSendSubmission = () => {
        this.props.sendSubmission();
        if (this.props.submissionSucceeded) {
            this.props.updateSubmissionsForUser();
        }
    };

    handleUpdateSubmission = (submissionId: string) => {
        this.props.updateSelectedSubmission(submissionId);
        this.props.openSubmissionFilesTable();
    };

    handleUpdateSubmissionMetaDialog = () => {
        this.props.updateSubmissionMeta();
        this.props.closeSubmissionMetaDialog();
    };

    handleDeleteSubmissionAlertCancel = () => {
        this.props.closeDeleteSubmissionAlert();
    };

    handleDeleteSubmissionAlertAgree = (submissionFile: SubmissionFile) => {
        this.props.closeDeleteSubmissionAlert();
        this.props.closeSubmissionFilesTable();
        this.props.deleteSubmission(submissionFile.submission_id);
    };

    handleDeleteSubmissionClick = (submissionId: string) => {
        this.props.updateSelectedSubmission(submissionId);
        this.props.openDeleteSubmissionAlert();
    };

    handleSubmissionFileSelect = (submissionFile: SubmissionFile) => {
        this.props.getSelectedSubmissionFile(submissionFile.submission_id, submissionFile.index);
        this.props.openSubmissionFileIssueDialog();
    };

    handleDeleteSubmissionFileAlertCancel = () => {
        this.props.closeDeleteSubmissionFileAlert();
    };

    handleDeleteSubmissionFileAlertAgree = (submissionFile: SubmissionFile) => {
        this.props.closeDeleteSubmissionFileAlert();
        this.props.deleteSubmissionFile(submissionFile.submission_id, submissionFile.index);
    };

    handleDeleteSubmissionFileClick = (submissionFile: SubmissionFile) => {
        this.props.updateSelectedSubmissionFile(submissionFile);
        this.props.openDeleteSubmissionFileAlert();
    };

    handleUploadSubmissionFileClick = (submissionFile: SubmissionFile) => {
        console.log(submissionFile);
        this.props.updateSelectedSubmissionFile(submissionFile);
        this.props.openUploadSubmissionFileDialog();
    };

    handleOploadSubmissionFileDialogOnCancel = () => {
        this.props.closeUploadSubmissionFileDialog();
    };

    handleUploadSubmissionFileDialogOnSave = (submissionFile: SubmissionFile, files: File[]) => {
        if (this.props.user) {
            const uploadData = {
                file: files[0],
                submissionId: submissionFile.submission_id,
                path: submissionFile.filename,
                publicationDate: null,
                allowPublication: false,
                username: this.props.user.name,
                userId: this.props.user.id,
            };

            this.props.uploadSubmissionFile(submissionFile, uploadData);
            this.props.closeUploadSubmissionFileDialog();
        }
    };

    handleDownloadSubmissionFile = (submissionFile: SubmissionFile) => {
        this.props.downloadSubmissionFile(submissionFile.submission_id, submissionFile.index);
    };

    handleSubmissionDialogOnDropRejected = (files: File[]) => {
        const file_names: string[] = files.map((file: File) => {
            return file.name
        });

        if (files.length > 10000000000) {
            const base_message = `You are trying to submit more than 10 GB. Please contact ops@eumetsat.int to get support for large submission\n`;
            const message = base_message + file_names.join('\n');
            const message_log = {
                id: 1,
                type: 'error' as MessageType,
                text: message
            };

            this.props.updateSubmissionMessages([message_log]);
        }
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <SubmissionDialog
                    show={this.props.submissionDialogOpen}
                    onClose={this.props.closeSubmissionDialog}

                    onSubmissionIdChange={this.props.updateSubmissionId}
                    submissionIdValue={this.props.selectedSubmissionId}

                    onPathChange={this.props.updatePath}
                    pathValue={this.props.selectedPath}

                    onAllowPublicationChange={this.props.updateAllowPublication}
                    allowPublication={this.props.allowPublication}

                    onDatafilesChange={this.props.updateDataFiles}
                    dataFilesValue={this.props.selectedDataFiles}

                    onDocfilesChange={this.props.updateDocFiles}
                    docFilesValue={this.props.selectedDocFiles}

                    onPublicationDateChange={this.props.updatePublicationDate}
                    publicationDate={this.props.selectedPublicationDate}

                    onFileSubmit={this.handleSendSubmission}

                    onClearForm={this.props.clearSubmissionForm}

                    onDropRejected={this.handleSubmissionDialogOnDropRejected}
                    submissionMessages={this.props.submissionMessages}
                    onHideSubmissionMessages={this.props.hideSubmissionMessages}

                    helpDialogOpen={this.props.helpDialogOpen}
                    openHelpDialog={this.props.openHelpDialog}
                    closeHelpDialog={this.props.closeHelpDialog}
                    submissionSucceeded={this.props.submissionSucceeded}
                />
                <SubmissionTable
                    show={!this.props.submissionDialogOpen}

                    onSubmissionSelect={this.handleUpdateSubmission}

                    onSubmissionApprove={this.handleApproveSubmission}
                    onSubmissionProcess={this.handleProcessSubmission}
                    onSubmissionReject={this.handleCancelSubmission}
                    onSubmissionHalt={this.handleHaltSubmission}
                    onSubmissionUpdate={this.handleSendSubmission}
                    onSubmissionRestart={this.handleRestartSubmission}
                    onSubmissionSubmit={this.handleSubmitSubmission}
                    onSubmissionDelete={this.handleDeleteSubmissionClick}

                    onSubmissionReady={this.handleSubmissionPublicationDateClick}
                    onSubmissionPublish={this.handlePublishSubmission}

                    onSubmissionDialogOpen={this.handleOpenSubmissionDialog}
                    onSubmissionDialogMetaOpen={this.handleOpenSubmissionMetaDialog}

                    submissionQuery={this.props.submissionQuery}
                    updateSubmissionQuery={this.props.updateSubmissionQuery}

                    submissionResult={this.props.submissionsForUser}
                    updateSubmissionsForUser={this.props.updateSubmissionsForUser }

                    user={this.props.user}
                />
                <SubmissionFilesTable
                    onClose={this.props.closeSubmissionFilesTable}
                    open={this.props.submissionFilesTableOpen}

                    submissionValue={this.props.selectedSubmission}

                    onSubmissionFileDeleteClick={this.handleDeleteSubmissionFileClick}
                    onSubmissionFileSelectClick={this.handleSubmissionFileSelect}
                    onSubmissionFileUploadClick={this.handleUploadSubmissionFileClick}
                    onSubmissionFileDownloadClick={this.handleDownloadSubmissionFile}

                    user={this.props.user}
                />
                <SubmissionIssueDialog
                    onClose={this.props.closeSubmissionFileIssueDialog}
                    open={this.props.submissionFileIssueDialogOpen}

                    submissionFileValue={this.props.selectedSubmissionFile}
                />
                <YesNoAlert
                    open={this.props.deleteSubmissionFileAlertOpen}
                    onClose={this.handleDeleteSubmissionFileAlertCancel}
                    onAgree={this.handleDeleteSubmissionFileAlertAgree}

                    value={this.props.selectedSubmissionFile}
                >
                    Do you really want to delete the Submission File: {this.props.selectedSubmissionFile.filename}?
                </YesNoAlert>
                {/*<YesNoAlert*/}
                {/*    open={this.props.deleteSubmissionAlertOpen}*/}
                {/*    onClose={this.handleDeleteSubmissionAlertCancel}*/}
                {/*    onAgree={this.handleDeleteSubmissionAlertAgree}*/}

                {/*    value={this.props.selectedSubmission}*/}
                {/*>*/}
                {/*    Do you really want to delete the Submission: {this.props.selectedSubmission.submission_id}?*/}
                {/*</YesNoAlert>*/}
                <SingleFileUpload
                    label={'Upload'}
                    onCancel={this.handleOploadSubmissionFileDialogOnCancel}
                    onSave={this.handleUploadSubmissionFileDialogOnSave}
                    open={this.props.uploadSubmissionFileDialogOpen}

                    value={this.props.selectedSubmissionFile}
                    accept={this.props.selectedSubmissionFile.filetype === 'MEASUREMENT' ? '.sb, .dat, .txt, .csv' : undefined}

                />
                <SubmissionMetaDialog
                    submissionId={this.props.selectedSubmission.submission_id}
                    show={this.props.submissionMetaDialogOpen}
                    onClose={this.props.closeSubmissionMetaDialog}

                    onSubmissionIdChange={this.props.updateSubmissionId}
                    submissionIdValue={this.props.selectedSubmissionId}

                    onPathChange={this.props.updatePath}
                    pathValue={this.props.selectedPath}

                    onAllowPublicationChange={this.props.updateAllowPublication}
                    allowPublication={this.props.allowPublication}

                    onPublicationDateChange={this.props.updatePublicationDate}
                    publicationDate={this.props.selectedPublicationDate}

                    onSubmit={this.handleUpdateSubmissionMetaDialog}

                    onClearForm={this.props.clearSubmissionForm}

                    helpDialogOpen={this.props.helpDialogOpen}
                    openHelpDialog={this.props.openHelpDialog}
                    closeHelpDialog={this.props.closeHelpDialog}
                    submissionSucceeded={this.props.submissionSucceeded}
                />
            </div>
        );
    }
}

export default SubmissionPanel;
