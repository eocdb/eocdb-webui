import * as React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const jsoneditorReact = require('jsoneditor-react');
import 'jsoneditor-react/es/editor.min.css';

const JsonEditor = jsoneditorReact.JsonEditor;

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    dialogContent: {
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});

interface EditJSONProps extends WithStyles<typeof styles> {
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

export default withStyles(styles)(EditJSON);
