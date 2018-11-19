import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";

interface HomePanelProps{
    classes: any;
    show: boolean;
}


class HomePanel extends React.PureComponent<HomePanelProps> {
    constructor(props: HomePanelProps){
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


export default HomePanel;