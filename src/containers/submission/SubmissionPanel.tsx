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
    updateCalibrationPath,
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
    updateAllowPublication,
    updateSubmissionMessages,
    hideSubmissionMessages,
    openSubmissionMetaDialog,
    closeSubmissionMetaDialog,
    updateSubmissionMeta,
    updateSubmissionQuery,
    closeCalibrationSubmitSteps,
    openCalibrationSubmitSteps
} from "../../actions/submissionActions";
import SubmissionPanel from "../../components/submission/SubmissionPanel";
import { openHelpDialog } from "../../actions/searchMapActions";
import { closeHelpDialog } from "../../actions/dashboardActions";


const mapStateToProps = (state: AppState) => {
    return {
        submissionDialogOpen: state.submissionState.submissionDialogOpen,
        calibrationSubmissionDialogOpen: state.submissionState.calibrationSubmissionDialogOpen,
        submissionFilesTableOpen: state.submissionState.submissionFilesDialogOpen,
        submissionMetaDialogOpen: state.submissionState.submissionMetaDialogOpen,
        submissionFileIssueDialogOpen: state.submissionState.submissionFileIssueDialogOpen,
        deleteSubmissionFileAlertOpen: state.submissionState.deleteSubmissionFileAlertOpen,
        deleteSubmissionAlertOpen: state.submissionState.deleteSubmissionAlertOpen,
        uploadSubmissionFileDialogOpen: state.submissionState.uploadSubmissionFileDialogOpen,

        setSubmissionPublicationDialogOpen: state.submissionState.setSubmissionPublicationDateDialogOpen,

        submissionQuery: state.submissionState.submissionQuery,
        submissionsForUser: state.submissionState.submissionResult,

        selectedSubmission: state.submissionState.selectedSubmission,
        selectedSubmissionFile: state.submissionState.selectedSubmissionFile,

        submissionPublicationDate: state.submissionState.submissionPublicationDate,

        // SubmissionDialog

        selectedSubmissionId: state.submissionState.submissionId,
        selectedPath: state.submissionState.path,
        selectedCalibrationPath: state.submissionState.calibrationPath,
        selectedPublicationDate: state.submissionState.publicationDate,
        selectedDataFiles: state.submissionState.dataFiles,
        selectedDocFiles: state.submissionState.docFiles,
        allowPublication: state.submissionState.allowPublication,

        user: state.sessionState.user,
        helpDialogOpen: state.submissionState.helpDialogOpen,

        submissionSucceeded: state.submissionState.submissionSucceeded,

        submissionMessages: state.submissionState.submissionMessages,
    }
};


const mapDispatchToProps = {
    closeSubmissionDialog: closeSubmitSteps,
    openSubmissionDialog: openSubmitSteps,

    closeCalibrationSubmissionDialog: closeCalibrationSubmitSteps,
    openCalibrationSubmissionDialog: openCalibrationSubmitSteps,

    openSubmissionFilesTable: openSubmissionFilesDialog,
    closeSubmissionFilesTable: closeSubmissionFilesDialog,

    openSubmissionMetaDialog,
    closeSubmissionMetaDialog,

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

    updateSubmissionQuery: updateSubmissionQuery,
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
    updateCalibrationPath,
    updatePublicationDate,
    updateAllowPublication,
    updateDataFiles,
    updateDocFiles,

    sendSubmission,
    updateSubmissionMeta,
    updateSubmissionMessages,
    hideSubmissionMessages,
    clearSubmissionForm,

    openHelpDialog,
    closeHelpDialog,
};


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPanel)

