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

interface YesNoAlertProperties<T> extends WithStyles<typeof styles>{
    open: boolean;
    onClose: () => void;
    onAgree: (value: T) => void;

    value: T;
}

class YesNoAlert<T> extends React.Component<YesNoAlertProperties<T>> {
    constructor(props: YesNoAlertProperties<T>) {
        super(props);
    }

    handleAgree = (value: T) => {
        this.props.onAgree(value)
    };

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
                    <Button onClick={() => this.handleAgree(this.props.value)} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(YesNoAlert);