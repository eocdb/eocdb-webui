import * as React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {},
});

interface HomePanelProps extends WithStyles<typeof styles> {
    show: boolean;
}

class HomePanel extends React.PureComponent<HomePanelProps> {
    constructor(props: HomePanelProps){
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
                    HOME
                </Typography>
            </div>
        );
    }
}


export default withStyles(styles)(HomePanel);
