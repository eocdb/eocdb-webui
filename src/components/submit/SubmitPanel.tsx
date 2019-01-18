import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import SubmitTable from "./SubmitTable";
import SubmitSteps from "../../containers/submit/SubmitSteps";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {},
});


interface SubmitPanelProps extends WithStyles<typeof styles> {
    show: boolean;
    submitStepsOpen: boolean;
    openSubmitSteps: () => void,
    closeSubmitSteps: () => void,
}


class SubmitPanel extends React.PureComponent<SubmitPanelProps> {
    constructor(props: SubmitPanelProps) {
        super(props);
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className={this.props.classes.root}>
                <SubmitSteps
                    show={this.props.submitStepsOpen}
                    closeSubmitSteps={this.props.closeSubmitSteps}
                />
                <SubmitTable
                    show={!this.props.submitStepsOpen}
                    openSubmitSteps={this.props.openSubmitSteps}
                />
            </div>
        );
    }
}

export default withStyles(styles)(SubmitPanel);
