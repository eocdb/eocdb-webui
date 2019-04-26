import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Theme,
    WithStyles
} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: 250,
    },
    dialogContent: {
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    appBar: {
        position: 'relative',
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    basicinput: {
        width: 150,
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});


interface InputDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;
    onSave: (value: string) => void;

    title: string;

    value: string;

    onChange: (value: string) => void;

    label: string;
}


class InputDialog extends React.Component<InputDialogProps> {
    constructor(props: InputDialogProps) {
        super(props);
    }

    handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value);
    };

    render() {
        const {classes, title} = this.props;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent
                    className={classes.dialogContent}
                >
                    <TextField
                        label={this.props.label}
                        value={this.props.value}
                        className={classes.basicinput}
                        onChange={this.handleOnChange}
                        variant={"outlined"}
                    />
                </DialogContent>
                <DialogActions className={classes.appBar}>
                    <Button onClick={() => this.props.onSave(this.props.value)}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Apply
                    </Button>
                    <Button onClick={this.props.onClose}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(InputDialog);