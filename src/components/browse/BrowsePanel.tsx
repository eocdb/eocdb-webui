import * as React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        title: {},
    });

interface BrowsePanelProps extends WithStyles<typeof styles> {
    classes: any;
    show: boolean;
}

class BrowsePanel extends React.PureComponent<BrowsePanelProps> {
    constructor(props: BrowsePanelProps) {
        super(props);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes} = this.props;
        return (
            <div>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    BROWSE
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(BrowsePanel);
