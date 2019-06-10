import { connect } from "react-redux";

import { AppState } from "../../states/appState";
import {
    clearSubmissionForm,
    closeDeleteSubmissionFilesAlert,
    closeDeleteSubmissionAlert,
    closeSubmissionFilesDialog,
    closeSubmissionIssuesDialog,
    closeSubmitSteps,
    deleteSubmission,
    deleteSubmissionFile,
    openDeleteSubmissionFilesAlert,
    openDeleteSubmissionAlert,
    openSubmissionFilesDialog,
    openSubmissionIssuesDialog,
    openSubmitSteps,
    sendSubmission,
    setSubmissionStatus,
    updateDataFiles,
    updateDocFiles,
    updatePath,
    updateSubmissionId,
    getSubmissionFile,
    getSubmission,
    getSubmissionsForUser,
    openUploadSubmissionFileDialog,
    closeUploadSubmissionFileDialog,
    updateSubmissionFile,
    updateSelectedSubmissionFile,
    openSubmissionPublicationDateDialog,
    closeSubmissionPublicationDateDialog,
    updateSubmissionPublicationDate,
    updatePublicationDate,
    downloadSubmissionFile,
    updateAllowPublication
} from "../../actions/submissionActions";
import SubmissionPanel from "../../components/submission/SubmissionPanel";
import { openHelpDialog } from "../../actions/searchMapActions";
import { closeHelpDialog } from "../../actions/dashboardActions";


const mapStateToProps = (state: AppState) => {
    return {
        submissionDialogOpen: state.submissionState.submissionDialogOpen,
        submissionFilesTableOpen: state.submissionState.submissionFilesDialogOpen,
        submissionFileIssueDialogOpen: state.submissionState.submissionFileIssueDialogOpen,
        deleteSubmissionFileAlertOpen: state.submissionState.deleteSubmissionFileAlertOpen,
        deleteSubmissionAlertOpen: state.submissionState.deleteSubmissionAlertOpen,
        uploadSubmissionFileDialogOpen: state.submissionState.uploadSubmissionFileDialogOpen,

        setSubmissionPublicationDialogOpen: state.submissionState.setSubmissionPublicationDateDialogOpen,

        submissionsForUser: state.submissionState.foundSubmissions,

        selectedSubmission: state.submissionState.selectedSubmission,
        selectedSubmissionFile: state.submissionState.selectedSubmissionFile,

        submissionPublicationDate: state.submissionState.submissionPublicationDate,

        // SubmissionDialog

        selectedSubmissionId: state.submissionState.submissionId,
        selectedPath: state.submissionState.path,
        selectedPublicationDate: state.submissionState.publicationDate,
        selectedDataFiles: state.submissionState.dataFiles,
        selectedDocFiles: state.submissionState.docFiles,
        allowPublication: state.submissionState.allowPublication,

        user: state.sessionState.user,
        helpDialogOpen: state.submissionState.helpDialogOpen,

        submissionSucceeded: state.submissionState.submissionSucceeded,
    };
};


const mapDispatchToProps = {
    closeSubmissionDialog: closeSubmitSteps,
    openSubmissionDialog: openSubmitSteps,

    openSubmissionFilesTable: openSubmissionFilesDialog,
    closeSubmissionFilesTable: closeSubmissionFilesDialog,

    openSubmissionFileIssueDialog: openSubmissionIssuesDialog,
    closeSubmissionFileIssueDialog: closeSubmissionIssuesDialog,

    openDeleteSubmissionFileAlert: openDeleteSubmissionFilesAlert,
    closeDeleteSubmissionFileAlert: closeDeleteSubmissionFilesAlert,

    downloadSubmissionFile,

    openSubmissionPublicationDateDialog,
    closeSubmissionPublicationDateDialog,

    openDeleteSubmissionAlert,
    closeDeleteSubmissionAlert,

    openUploadSubmissionFileDialog,
    closeUploadSubmissionFileDialog,

    updateSubmissionsForUser: getSubmissionsForUser,

    updateSelectedSubmission:  getSubmission,
    updateSelectedSubmissionFile,
    getSelectedSubmissionFile: getSubmissionFile,

    updateSelectedSubmissionPublicationDate: updateSubmissionPublicationDate,

    deleteSubmission,
    setSubmissionStatus,
    deleteSubmissionFile,
    uploadSubmissionFile: updateSubmissionFile,

    updateSubmissionId,
    updatePath,
    updatePublicationDate,
    updateAllowPublication,
    updateDataFiles,
    updateDocFiles,

    sendSubmission,
    clearSubmissionForm,

    openHelpDialog,
    closeHelpDialog,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPanel)

