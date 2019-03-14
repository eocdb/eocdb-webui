import * as React from "react";
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Icon from "@material-ui/core/Icon/Icon";
import { SubmissionFile } from "../../model";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { Submission } from "../../model/Submission";


const styles = (theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing.unit * 2,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    searchField: {
        width: 300,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});


export interface SubmissionFilesTableProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    submissionValue: Submission;

    onSubmissionFileSelectClick: (submissionFile: SubmissionFile) => void;
    onSubmissionFileDeleteClick: (submissionFile: SubmissionFile) => void;
    onSubmissionFileUploadClick: (submissionFile: SubmissionFile) => void;
}


class SubmissionFilesTable extends React.Component<SubmissionFilesTableProps> {
    constructor(props: SubmissionFilesTableProps) {
        super(props);
    }

    getColoutForStatus = (status: string) => {
        switch (status) {
            case 'OK':
                return "green";
            case 'WARNING':
                return "orange";
            case 'ERROR':
                return "red";
            case 'SUBMITTED':
                return "blue";
        }
        return "yellow"
    };

    render() {
        if (!this.props.open) {
            return null;
        }

        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <Grid container justify={"flex-end"}>
                    <Button
                        color={"primary"}
                        onClick={this.props.onClose}
                    >
                        Close
                    </Button>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>FileName</TableCell>
                            <TableCell>File Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.submissionValue.files.map((row: SubmissionFile) => {
                            const colour = this.getColoutForStatus(row.status);
                            return (
                                <TableRow key={row.filename}>
                                    <TableCell>
                                        {row.filename}

                                    </TableCell>
                                    <TableCell>
                                        {row.filetype}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            style={{background: colour, color: "white"}}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => this.props.onSubmissionFileSelectClick(
                                                row
                                            )}
                                            disabled={row.filetype === 'DOCUMENT'}
                                        >
                                            <Icon className={classes.rightIcon}>list</Icon>
                                        </Button>
                                        <Button
                                            onClick={() => this.props.onSubmissionFileDeleteClick(
                                                row
                                            )}
                                        >
                                            <Icon className={classes.rightIcon}>delete</Icon>
                                        </Button>
                                        <Button
                                            onClick={() => this.props.onSubmissionFileUploadClick(
                                                row
                                            )}
                                        >
                                            <Icon className={classes.rightIcon}>cloud_upload</Icon>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}


export default withStyles(styles)(SubmissionFilesTable);

