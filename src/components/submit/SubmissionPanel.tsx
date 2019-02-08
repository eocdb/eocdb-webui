import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import SubmissionTable from "../../containers/submit/SubmissionTable";
import Submission from "../../containers/submit/Submission";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {},
});


interface SubmissionPanelProps extends WithStyles<typeof styles> {
    show: boolean;
    submissionOpen: boolean;
    openSubmission: () => void,
    closeSubmission: () => void,
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
