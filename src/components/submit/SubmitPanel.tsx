import * as React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {},
});

interface SubmitPanelProps extends WithStyles<typeof styles> {
    show: boolean;
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
            <div>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                >
                    SUBMIT
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(SubmitPanel);
