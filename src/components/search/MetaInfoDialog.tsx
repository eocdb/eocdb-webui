import * as React from "react";
import { Dataset } from "../../model";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from "@mui/material";


interface MetaInfoDialogProps {
    open: boolean;
    dataset: Dataset;

    handleClose: () => void;

    helpDialogOpen: boolean;
    closeHelpDialog: () => void;
    openHelpDialog: (helpMetaInfoKey: string) => void;
    helpMetaInfoKey: string;
}


class MetaInfoDialog extends React.Component<MetaInfoDialogProps> {
    constructor(props: MetaInfoDialogProps) {
        super(props);
    }

    // noinspection JSMethodCanBeStatic
    renderInfo(dataset: Dataset) {
        const metadata = dataset.metadata;
        const attributes = dataset.attributes.join(',');
        let items = [];

        for (let key in metadata) {
            if(metadata.hasOwnProperty(key)) {
                let value = 'Type of content not known.';
                let varType = typeof metadata[key];
                if (varType === "string" || varType === "number") {
                    value = metadata[key];
                } else if (metadata[key] instanceof Array) {
                    value = metadata[key].join(',');
                }
                items.push(
                    <ListItem component={'span'} key={key}>
                        <ListItemText secondary={value} primary={key}/>
                    </ListItem>
                );
            }
        }

        items.push(
            <ListItem component={'span'} key={'fields'}>
                <ListItemText secondary={attributes} primary={'fields'}/>
            </ListItem>
        );

        return (
            <List>
                {items}
            </List>
        );
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    {this.renderInfo(this.props.dataset)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default MetaInfoDialog;
