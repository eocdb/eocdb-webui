import * as React from "react";
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, withStyles,
    WithStyles
} from "@material-ui/core";


const styles = createStyles({root: {}});

interface YesNoAlertProperties extends WithStyles<typeof styles>{
    open: boolean;
    onClose: () => void;
    onAgree: () => void;
}

class YesNoAlert extends React.Component<YesNoAlertProperties> {
    constructor(props: YesNoAlertProperties) {
        super(props);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.props.onAgree} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(YesNoAlert);