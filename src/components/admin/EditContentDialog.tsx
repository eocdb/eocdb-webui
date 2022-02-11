import * as React from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface EditMarkdownContentDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (content: string) => void;

    content: string;
}

interface EditMarkdownContentDialogState {
    value: string;
    tab: "write" | "preview"
}

class EditMarkdownContentDialog extends React.Component<EditMarkdownContentDialogProps, EditMarkdownContentDialogState> {
    constructor(props: EditMarkdownContentDialogProps) {
        super(props);
        this.state = {
            value: this.props.content,
            tab: 'write',
        };

        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });
    }

    private converter: any;

    handleValueChange = (value: string) => {
        this.setState({ value });
    };

    handleTabChange = (tab: "write" | "preview") => {
        this.setState({tab})
    };

    // noinspection JSUnusedLocalSymbols
    handleSave = (event: React.MouseEvent) => {
        const content = this.state.value;
        this.props.onSave(content);
        this.props.onClose();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Links</DialogTitle>
                    <DialogContent>
                        <ReactMde
                            onChange={this.handleValueChange}
                            onTabChange={this.handleTabChange}

                            value={this.state.value}
                            selectedTab={this.state.tab}

                            generateMarkdownPreview={markdown =>
                                Promise.resolve(this.converter.makeHtml(markdown))
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditMarkdownContentDialog;
