import * as React from 'react';
import { Typography } from "@mui/material";

// noinspection JSUnusedLocalSymbols

interface BrowsePanelProps {
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

        return (
            <div>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    // className={classes.title}
                >
                    BROWSE
                </Typography>
            </div>
        );
    }
}

export default BrowsePanel;
