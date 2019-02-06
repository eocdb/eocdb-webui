import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FileUpload from "./FileUpload";
//import { Cancel } from "@material-ui/icons";



const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});


interface SubmitStepsProps extends WithStyles<typeof styles> {
    show: boolean;
    closeSubmitSteps: () => void;

    dataFiles: File[];
    docFiles: File[];

    onDatafilesChange: (acceptedFiles: File[]) => void;
    onDocfilesChange: (acceptedFiles: File[]) => void;
}


class SubmitSteps extends React.Component<SubmitStepsProps> {
    constructor(props: SubmitStepsProps) {
        super(props);
    }

    // noinspection JSUnusedLocalSymbols
    handleOndropDatafiles = (acceptedFiles: File[]) => {
        this.props.onDatafilesChange(acceptedFiles);
    };

    handleOndropDocfiles = (acceptedFiles: File[]) => {
        this.props.onDocfilesChange(acceptedFiles);
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <FileUpload
                    key={'drop-datafiles'}
                    onDrop={this.handleOndropDatafiles}
                    files={this.props.dataFiles}
                />
                <FileUpload
                    key={'drop-datafiles'}
                    onDrop={this.handleOndropDocfiles}
                    files={this.props.docFiles}
                />
            </div>
        );
    }
}


export default withStyles(styles)(SubmitSteps);