import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";

interface DashHomePanelProps{
    classes: any;
    show: boolean;
}


class PanelHome extends React.PureComponent<DashHomePanelProps> {
    constructor(props: DashHomePanelProps){
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
                    HOME
                </Typography>
            </div>
        );
    }
}


export default PanelHome;