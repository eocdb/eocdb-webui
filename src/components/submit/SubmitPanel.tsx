import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";

interface SubmitPanelProps {
    classes: any;
    show: boolean;
}


class SubmitPanel extends React.PureComponent<SubmitPanelProps> {
    constructor(props: SubmitPanelProps) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={this.props.show ? '' : classes.hidden}>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    SUBMIT
                </Typography>
            </div>
        );
    }
}


export default SubmitPanel;