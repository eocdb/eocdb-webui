import * as React from 'react';

const jsoneditorReact = require('jsoneditor-react');
import 'jsoneditor-react/es/editor.min.css';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const JsonEditor = jsoneditorReact.JsonEditor;

// noinspection JSUnusedLocalSymbols
// const styles = (theme: Theme) => createStyles({
//     dialogContent: {
//         marginLeft: theme.spacing.unit * 4,
//         marginRight: theme.spacing.unit * 4,
//         marginTop: theme.spacing.unit * 4,
//         marginBottom: theme.spacing.unit * 4,
//     },
//     appBar: {
//         position: 'relative',
//     },
//     flex: {
//         flex: 1,
//     },
//     textField: {},
//     button: {},
//     rightIcon: {},
//     tableContainer: {},
// });

interface EditJSONProps {
    open: boolean;
}

interface EditJSONPropsState {
    value: any;
}

const js =
{
  "header": [
        {
          "name": "investigators",
          "type": "field_required",
          "error": "@required_field_missing"
        },
        {
          "name": "affiliations",
          "type": "field_required",
          "error": "@required_field_missing"
        },
        {
          "name": "contact",
          "type": "field_required",
          "error": "@required_field_missing"
        }
    ]
};

class EditJSON extends React.Component<EditJSONProps, EditJSONPropsState> {
    constructor(props: EditJSONProps) {
        super(props);
        this.state = {
            value: js,
        };
    }

    handleValueChange = (value: string) => {
        this.setState({ value });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    //onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                    style={{width: '1000px'}}
                >
                    <DialogTitle id="form-dialog-title">Edit Links</DialogTitle>
                    <DialogContent>
                        <JsonEditor
                            view={"dual"}
                            value={this.state.value}
                            onChange={this.handleValueChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        {/*<Button onClick={this.props.onClose} color="primary">*/}
                            {/*Cancel*/}
                        {/*</Button>*/}
                        {/*<Button onClick={this.handleSave} color="primary">*/}
                            {/*Save*/}
                        {/*</Button>*/}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditJSON;
