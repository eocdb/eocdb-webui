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

interface LinksPanelProps extends WithStyles<typeof styles> {
    show: boolean;
    content: string;
}

class LinkaPanel extends React.PureComponent<LinksPanelProps> {
    constructor(props: LinksPanelProps) {
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
                {this.props.content}
            </div>
        );
    }
}

export default withStyles(styles)(LinkaPanel);
