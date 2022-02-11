import * as React from 'react';
import { Typography } from "@mui/material";

interface HomePanelProps {
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


export default HomePanel;
