import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";

interface AdminPanelProps{
    classes: any;
    show: boolean;
}


class AdminPanel extends React.PureComponent<AdminPanelProps> {
    constructor(props: AdminPanelProps){
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


export default AdminPanel;