import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";

interface PanelAdminProps{
    classes: any;
    show: boolean;
}


class PanelAdmin extends React.PureComponent<PanelAdminProps> {
    constructor(props: PanelAdminProps){
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
                    ADMIN
                </Typography>
            </div>
        );
    }
}


export default PanelAdmin;