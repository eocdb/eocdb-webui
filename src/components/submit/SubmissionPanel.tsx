import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import SubmissionTable from "../../containers/submit/SubmissionTable";
import Submission from "./Submission";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {},
});


interface SubmissionPanelProps extends WithStyles<typeof styles> {
    show: boolean;
    submissionOpen: boolean;
    openSubmission: () => void,
    closeSubmission: () => void,

    // Submission props
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
    updateSubmissionsForUser: () => void;
}


class SubmissionPanel extends React.PureComponent<SubmissionPanelProps> {
    constructor(props: SubmissionPanelProps) {
        super(props);
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className={this.props.classes.root}>
                <Submission
                    show={this.props.submissionOpen}
                    onClose={this.props.closeSubmission}

                    onSubmissionIdChange={this.props.updateSubmissionId}
                    submissionIdValue={this.props.selectedSubmissionId}

                    onPathChange={this.props.updatePath}
                    pathValue={this.props.selectedPath}

                    onDatafilesChange={this.props.updateDataFiles}
                    dataFilesValue={this.props.selectedDataFiles}

                    onDocfilesChange={this.props.updateDocFiles}
                    docFilesValue={this.props.selectedDocFiles}

                    onSubmissionsChange={this.props.updateSubmissionsForUser}
                    onFileSubmit={this.props.sendSubmission}

                    onClearForm={this.props.clearSubmissionForm}
                />
                <SubmissionTable
                    show={!this.props.submissionOpen}
                    openSubmitSteps={this.props.openSubmission}
                />
            </div>
        );
    }
}

export default withStyles(styles)(SubmissionPanel);
