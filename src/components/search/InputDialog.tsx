import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";


interface InputDialogProps {
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
        const {title} = this.props;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent
                    // className={classes.dialogContent}
                >
                    <TextField
                        label={this.props.label}
                        value={this.props.value}
                        // className={classes.basicinput}
                        onChange={this.handleOnChange}
                        variant={"outlined"}
                    />
                </DialogContent>
                <DialogActions>
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

export default InputDialog;
