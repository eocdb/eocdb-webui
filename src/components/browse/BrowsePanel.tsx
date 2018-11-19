import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";

interface BrowsePanelProps{
    classes: any;
    show: boolean;
}


class BrowsePanel extends React.PureComponent<BrowsePanelProps> {
    constructor(props: BrowsePanelProps){
        super(props);
    }

    render(){
        const {classes} = this.props;
        return(
            <div className={this.props.show? '': classes.hidden}>
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


export default BrowsePanel;