import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FileUpload from "./FileUpload";
import TextField from "@material-ui/core/TextField";
import * as classNames from "classnames";
import {CloudUpload} from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
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


interface SubmitStepsProps extends WithStyles<typeof styles> {
    show: boolean;
    closeSubmitSteps: () => void;

    submissionId: string;
    dataFiles: File[];
    docFiles: File[];

    onSubmissionIdChange: (submissionId: string) => void;
    onDatafilesChange: (acceptedFiles: File[]) => void;
    onDocfilesChange: (acceptedFiles: File[]) => void;
    onFileSubmit: () => void;
}


class SubmitSteps extends React.Component<SubmitStepsProps> {
    constructor(props: SubmitStepsProps) {
        super(props);
    }

    handleSubmissionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        this.props.onSubmissionIdChange(value);
    };

    handleOndropDatafiles = (acceptedFiles: File[]) => {
        this.props.onDatafilesChange(acceptedFiles);
    };

    handleOndropDocfiles = (acceptedFiles: File[]) => {
        this.props.onDocfilesChange(acceptedFiles);
    };

    handlefileSubmit = () => {
        this.props.onFileSubmit();
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={this.handleFileSubmit}
                >
                    New Submission
                    <CloudUpload/>
                </Button>
                <TextField
                    required
                    id="outlined-dense"
                    label="Submission Label"
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                    onChange={this.handleSubmissionIdChange}
                />
                <FileUpload
                    key={'drop-datafiles'}
                    onChange={this.handleOndropDatafiles}
                    files={this.props.dataFiles}
                    acceptedFiles={['.dat', '.csv', '.txt', '.sb']}
                />
                <FileUpload
                    key={'drop-docfiles'}
                    onChange={this.handleOndropDocfiles}
                    files={this.props.docFiles}
                />
            </div>
        );
    }
}


export default withStyles(styles)(SubmitSteps);