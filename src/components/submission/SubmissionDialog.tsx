import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FileUpload from "./FileUpload";
import TextField from "@material-ui/core/TextField";
import * as classNames from "classnames";
import { CloudUpload } from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid";
//import { Cancel } from "@material-ui/icons";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});


interface SubmissionDialogProps extends WithStyles<typeof styles> {
    show: boolean;
    onClose: () => void;

    onSubmissionIdChange: (submissionId: string) => void;
    submissionIdValue: string;

    onPathChange: (path: string) => void;
    pathValue: string;

    onDatafilesChange: (acceptedFiles: File[]) => void;
    dataFilesValue: File[];

    onDocfilesChange: (acceptedFiles: File[]) => void;
    docFilesValue: File[];

    onFileSubmit: () => void;

    onClearForm: () => void;
}


class SubmissionDialog extends React.Component<SubmissionDialogProps> {
    constructor(props: SubmissionDialogProps) {
        super(props);
    }

    handleSubmissionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        this.props.onSubmissionIdChange(value);
    };

    handleOnPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const path = event.target.value;

        this.props.onPathChange(path);
    };

    handleOndropDatafiles = (acceptedFiles: File[]) => {
        this.props.onDatafilesChange(acceptedFiles);
    };

    handleOndropDocfiles = (acceptedFiles: File[]) => {
        this.props.onDocfilesChange(acceptedFiles);
    };

    handleFileSubmit = () => {
        this.props.onFileSubmit();
        this.props.onClearForm();
        this.props.onClose();
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify={"flex-end"}>
                    <Button variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={this.handleFileSubmit}
                    >
                        Submit
                        <CloudUpload/>
                    </Button>
                    <Button variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={this.props.onClearForm}
                    >
                        Clear
                    </Button>
                    <Button onClick={this.props.onClose}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Close
                    </Button>
                </Grid>
                <Grid container justify={"flex-start"} spacing={16} direction={"column"}>
                    <Grid item>
                        <TextField
                            required
                            id="outlined-dense"
                            label="Submission Label"
                            className={classNames(classes.textField, classes.dense)}
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleSubmissionIdChange}
                            value={this.props.submissionIdValue}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="submission-path"
                            label="Submission Path"
                            className={classNames(classes.textField, classes.dense)}
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleOnPathChange}
                            value={this.props.pathValue}
                        />
                    </Grid>
                    <Grid item>
                        <FileUpload
                            key={'drop-datafiles'}
                            label={'Drag and drop DATA files here or click'}
                            onChange={this.handleOndropDatafiles}
                            files={this.props.dataFilesValue}
                            acceptedFiles={['.dat', '.csv', '.txt', '.sb']}
                        />
                    </Grid>
                    <Grid item>
                        <FileUpload
                            key={'drop-docfiles'}
                            label={'Drag and drop DOCUMENT files here or click'}
                            onChange={this.handleOndropDocfiles}
                            files={this.props.docFilesValue}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(SubmissionDialog);