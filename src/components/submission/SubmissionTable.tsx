import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Table from "@material-ui/core/Table/Table";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import { CloudUpload } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import Icon from '@material-ui/core/Icon/Icon';
import Chip from "@material-ui/core/Chip";

import { Submission } from "../../model";
import { User } from "../../model/User";
import SingleFileUpload from "./SingleFileUpload";



const styles = (theme: Theme) => createStyles(
    {
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 700,
        },
        rightIcon: {},
        button: {
            margin: theme.spacing.unit / 2,
        },
        link: {
            fontcolor: "black"
        },
    });


interface SubmissionTableProps extends WithStyles<typeof styles> {
    show: boolean;

    onSubmissionDialogOpen: () => void;

    onSubmissionSelect: (selectedSubmissionId: string) => void;

    onSubmissionApprove: (selectedSubmissionId: string) => void;
    onSubmissionReject: (selectedSubmissionId: string) => void;
    onSubmissionHalt: (selectedSubmissionId: string) => void;
    onSubmissionRestart: (selectedSubmissionId: string) => void;

    submissionsValue: Submission[];

    user: User;
}


class SubmissionTable extends React.PureComponent<SubmissionTableProps> {
    constructor(props: SubmissionTableProps) {
        super(props);
    }

    getColourForStatus = (status: string) => {
        switch (status) {
            case 'SUBMITTED':
                return "blue";
            case 'APPROVED':
                return "green";
            case 'HALTED':
                return "orange";
            case 'REJECTED':
                return "red";
        }
        return "yellow"
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes, submissionsValue, user} = this.props;

        return (
            <div>
                <Paper className={classes.root}>
                    <Grid container justify={"flex-end"}>
                        <Button variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.props.onSubmissionDialogOpen}
                        >
                            New Submission
                            <CloudUpload/>
                        </Button>
                    </Grid>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>SubmissionId</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submissionsValue.map((row: Submission) => {
                                const colour = this.getColourForStatus(row.status);

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        key={row.submission_id}
                                        tabIndex={-1}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.submission_id}
                                        </TableCell>
                                        <TableCell>
                                            {row.date}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
                                                style={{background: colour, color: "white"}}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => this.props.onSubmissionSelect(
                                                    row.submission_id
                                                )}
                                            >
                                                <Icon className={classes.rightIcon}>list</Icon>
                                            </Button>
                                            {row.status === 'HALTED' ?
                                                <Button
                                                    onClick={() => this.props.onSubmissionRestart(
                                                        row.submission_id
                                                    )}
                                                >
                                                    <Icon className={classes.rightIcon}>play_arrow</Icon>

                                                </Button>
                                                :
                                                <Button
                                                    onClick={() => this.props.onSubmissionHalt(
                                                        row.submission_id
                                                    )}
                                                >
                                                    <Icon className={classes.rightIcon}>pause</Icon>
                                                </Button>
                                            }
                                            <Button
                                                onClick={() => this.props.onSubmissionApprove(
                                                    row.submission_id
                                                )}
                                                disabled={user.roles.indexOf('admin') === -1}
                                            >
                                                <Icon className={classes.rightIcon}>done</Icon>
                                            </Button>
                                            <Button
                                                onClick={() => this.props.onSubmissionReject(
                                                    row.submission_id
                                                )}
                                                disabled={user.roles.indexOf('admin') === -1}
                                            >
                                                <Icon className={classes.rightIcon}>clear</Icon>
                                            </Button>
                                            <SingleFileUpload
                                                label={'Add'}
                                                onCancel={() => {console.log('Cancel')}}
                                                onSave={() => {console.log('Save')}}
                                                open={true}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}


export default withStyles(styles)(SubmissionTable);