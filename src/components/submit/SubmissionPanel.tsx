import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import SubmitTable from "../../containers/submit/SubmissionTable";
import SubmitSteps from "../../containers/submit/Submission";


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
                <SubmitSteps
                    show={this.props.submissionOpen}
                    onClose={this.props.closeSubmission}
                    onOpen={this.props.openSubmission}
                />
                <SubmitTable
                    show={!this.props.submissionOpen}
                    openSubmitSteps={this.props.openSubmission}
                />
            </div>
        );
    }
}

export default withStyles(styles)(SubmissionPanel);
