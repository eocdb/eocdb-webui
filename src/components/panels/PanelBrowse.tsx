import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";

interface PanelBrowseProps{
    classes: any;
    show: boolean;
}


class PanelBrowse extends React.PureComponent<PanelBrowseProps> {
    constructor(props: PanelBrowseProps){
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


export default PanelBrowse;